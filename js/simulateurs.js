// Simulateurs — estimations indicatives calculées côté client (voir avertissement sur chaque page).
function rbFormatEUR(value) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
}

// Animated breakdown under the figures: one stacked bar per scenario, redrawn
// on every input. `rows` = [{ name, parts: [amounts] }], `legend` = labels of the parts.
const RB_SIM_TONES = ['gold', 'light', 'pale', 'line'];
function rbSimLang() {
  return (window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr') === 'en' ? 'en' : 'fr';
}
function rbSimChart(form, rows, legend) {
  const panel = form.closest('.simulator-grid')?.querySelector('.simulator-results');
  if (!panel) return;
  let chart = panel.querySelector('.sim-chart');
  const shape = rows.map((r) => r.parts.length).join('-');
  if (!chart || chart.dataset.shape !== shape) {
    chart?.remove();
    chart = document.createElement('div');
    chart.className = 'sim-chart';
    chart.dataset.shape = shape;
    chart.innerHTML = `<p class="sim-chart__title"></p>${rows.map((r) => `<div class="sim-chart__row"><span class="sim-chart__name"></span><div class="sim-chart__bar">${r.parts.map((_, i) => `<i class="sim-chart__seg sim-chart__seg--${RB_SIM_TONES[i]}" data-i="${i}"><b></b></i>`).join('')}</div></div>`).join('')}<ul class="sim-chart__legend">${legend.map((_, i) => `<li data-i="${i}"><i class="sim-chart__seg--${RB_SIM_TONES[i]}"></i><span></span></li>`).join('')}</ul>`;
    panel.appendChild(chart);
    // hovering a legend entry or a segment lights the matching parts
    chart.addEventListener('pointerover', (e) => {
      const hit = e.target.closest('[data-i]');
      chart.querySelectorAll('[data-i]').forEach((el) => el.classList.toggle('is-dim', !!hit && el.dataset.i !== hit.dataset.i));
    });
    chart.addEventListener('pointerleave', () => chart.querySelectorAll('.is-dim').forEach((el) => el.classList.remove('is-dim')));
    requestAnimationFrame(() => requestAnimationFrame(() => chart.classList.add('is-in')));
  }
  chart.querySelector('.sim-chart__title').textContent = rbSimLang() === 'en' ? 'Breakdown' : 'Répartition';
  const rowEls = chart.querySelectorAll('.sim-chart__row');
  rows.forEach((r, ri) => {
    const total = r.parts.reduce((a, v) => a + Math.max(0, v), 0);
    const name = rowEls[ri].querySelector('.sim-chart__name');
    name.textContent = r.name || '';
    name.hidden = !r.name;
    rowEls[ri].querySelectorAll('.sim-chart__seg').forEach((seg, i) => {
      const share = total > 0 ? (Math.max(0, r.parts[i]) / total) * 100 : 0;
      seg.style.flexBasis = `${share.toFixed(2)}%`;
      seg.querySelector('b').textContent = share >= 9 ? `${Math.round(share)} %` : '';
      seg.title = `${legend[i]} : ${rbFormatEUR(r.parts[i])}`;
    });
  });
  chart.querySelectorAll('.sim-chart__legend span').forEach((el, i) => { el.textContent = legend[i]; });
}

function initSimIS() {
  const form = document.getElementById('sim-is-form');
  if (!form) return;
  const resultatInput = document.getElementById('sim-is-resultat');
  const eligibleInput = document.getElementById('sim-is-eligible');
  const outTranche15 = document.getElementById('sim-is-tranche15');
  const outTranche25 = document.getElementById('sim-is-tranche25');
  const outTotal = document.getElementById('sim-is-total');
  const outRate = document.getElementById('sim-is-rate');
  const seuil = 42500;

  function compute() {
    const resultat = Math.max(0, parseFloat(resultatInput.value) || 0);
    let is15 = 0;
    let is25 = 0;
    if (eligibleInput.checked) {
      is15 = Math.min(resultat, seuil) * 0.15;
      is25 = Math.max(0, resultat - seuil) * 0.25;
    } else {
      is25 = resultat * 0.25;
    }
    const total = is15 + is25;
    const rate = resultat > 0 ? (total / resultat) * 100 : 0;
    outTranche15.textContent = rbFormatEUR(is15);
    outTranche25.textContent = rbFormatEUR(is25);
    outTotal.textContent = rbFormatEUR(total);
    outRate.textContent = rate.toFixed(1).replace('.', ',') + ' %';
    const en = rbSimLang() === 'en';
    rbSimChart(form, [{ parts: [is15, is25, resultat - total] }], en ? ['Tax at 15%', 'Tax at 25%', 'Profit after tax'] : ['IS à 15 %', 'IS à 25 %', 'Résultat après IS']);
  }
  document.addEventListener('rb:langchange', compute);

  form.addEventListener('input', compute);
  compute();
}

function initSimCoutSalarie() {
  const form = document.getElementById('sim-cout-form');
  if (!form) return;
  const brutInput = document.getElementById('sim-cout-brut');
  const statutInput = document.getElementById('sim-cout-statut');
  const outPatronales = document.getElementById('sim-cout-patronales');
  const outMensuel = document.getElementById('sim-cout-mensuel');
  const outAnnuel = document.getElementById('sim-cout-annuel');
  const outNet = document.getElementById('sim-cout-net');

  function compute() {
    const brut = Math.max(0, parseFloat(brutInput.value) || 0);
    const cadre = statutInput.value === 'cadre';
    const tauxPatronal = cadre ? 0.45 : 0.42;
    const tauxSalarial = cadre ? 0.25 : 0.22;
    const patronales = brut * tauxPatronal;
    const mensuel = brut + patronales;
    outPatronales.textContent = rbFormatEUR(patronales);
    outMensuel.textContent = rbFormatEUR(mensuel);
    outAnnuel.textContent = rbFormatEUR(mensuel * 12);
    outNet.textContent = rbFormatEUR(brut * (1 - tauxSalarial));
    const en = rbSimLang() === 'en';
    rbSimChart(form, [{ parts: [brut * (1 - tauxSalarial), brut * tauxSalarial, patronales] }], en ? ['Net before tax', 'Employee contributions', 'Employer contributions'] : ['Net avant impôt', 'Cotisations salariales', 'Charges patronales']);
  }
  document.addEventListener('rb:langchange', compute);

  form.addEventListener('input', compute);
  compute();
}

function initSimDirigeant() {
  const form = document.getElementById('sim-dirigeant-form');
  if (!form) return;
  const coutInput = document.getElementById('sim-dirigeant-cout');
  const outSasuNet = document.getElementById('sim-dirigeant-sasu-net');
  const outSasuCharges = document.getElementById('sim-dirigeant-sasu-charges');
  const outSarlNet = document.getElementById('sim-dirigeant-sarl-net');
  const outSarlCharges = document.getElementById('sim-dirigeant-sarl-charges');
  const sasuNetRatio = 0.55;
  const sarlNetRatio = 0.68;

  function compute() {
    const cout = Math.max(0, parseFloat(coutInput.value) || 0);
    const sasuNet = cout * sasuNetRatio;
    const sarlNet = cout * sarlNetRatio;
    outSasuNet.textContent = rbFormatEUR(sasuNet);
    outSasuCharges.textContent = rbFormatEUR(cout - sasuNet);
    outSarlNet.textContent = rbFormatEUR(sarlNet);
    outSarlCharges.textContent = rbFormatEUR(cout - sarlNet);
    const en = rbSimLang() === 'en';
    rbSimChart(form, [{ name: 'SASU', parts: [sasuNet, cout - sasuNet] }, { name: en ? 'SARL (self-employed)' : 'SARL (TNS)', parts: [sarlNet, cout - sarlNet] }], en ? ['Net pay', 'Social charges'] : ['Rémunération nette', 'Charges sociales']);
  }
  document.addEventListener('rb:langchange', compute);

  form.addEventListener('input', compute);
  compute();
}

function initSimBrutNet() {
  const form = document.getElementById('sim-brutnet-form');
  if (!form) return;
  const brutInput = document.getElementById('sim-brutnet-brut');
  const statutInput = document.getElementById('sim-brutnet-statut');
  const outNet = document.getElementById('sim-brutnet-net');
  const outCharges = document.getElementById('sim-brutnet-charges');
  const outCoutEmployeur = document.getElementById('sim-brutnet-cout-employeur');

  function compute() {
    const brut = Math.max(0, parseFloat(brutInput.value) || 0);
    const cadre = statutInput.value === 'cadre';
    const tauxSalarial = cadre ? 0.25 : 0.22;
    const tauxPatronal = cadre ? 0.45 : 0.42;
    const net = brut * (1 - tauxSalarial);
    outNet.textContent = rbFormatEUR(net);
    outCharges.textContent = rbFormatEUR(brut - net);
    outCoutEmployeur.textContent = rbFormatEUR(brut * (1 + tauxPatronal));
    const en = rbSimLang() === 'en';
    rbSimChart(form, [{ parts: [net, brut - net, brut * tauxPatronal] }], en ? ['Net before tax', 'Employee contributions', 'Employer contributions'] : ['Net avant impôt', 'Cotisations salariales', 'Charges patronales']);
  }
  document.addEventListener('rb:langchange', compute);

  form.addEventListener('input', compute);
  compute();
}

function initSimTNS() {
  const form = document.getElementById('sim-tns-form');
  if (!form) return;
  const revenuInput = document.getElementById('sim-tns-revenu');
  const outCotisations = document.getElementById('sim-tns-cotisations');
  const outNet = document.getElementById('sim-tns-net');
  const tauxTNS = 0.35;

  function compute() {
    const revenu = Math.max(0, parseFloat(revenuInput.value) || 0);
    const cotisations = revenu * tauxTNS;
    outCotisations.textContent = rbFormatEUR(cotisations);
    outNet.textContent = rbFormatEUR(revenu - cotisations);
    const en = rbSimLang() === 'en';
    rbSimChart(form, [{ parts: [revenu - cotisations, cotisations] }], en ? ['Net income', 'Social contributions'] : ['Revenu net', 'Cotisations sociales']);
  }
  document.addEventListener('rb:langchange', compute);

  form.addEventListener('input', compute);
  compute();
}

function initSimDividendes() {
  const form = document.getElementById('sim-dividendes-form');
  if (!form) return;
  const montantInput = document.getElementById('sim-dividendes-montant');
  const tmiInput = document.getElementById('sim-dividendes-tmi');
  const outPfuNet = document.getElementById('sim-dividendes-pfu-net');
  const outBaremeImpot = document.getElementById('sim-dividendes-bareme-impot');
  const outBaremePs = document.getElementById('sim-dividendes-bareme-ps');
  const outBaremeNet = document.getElementById('sim-dividendes-bareme-net');
  const psRate = 0.186;

  function compute() {
    const montant = Math.max(0, parseFloat(montantInput.value) || 0);
    const tmi = parseFloat(tmiInput.value) || 0;

    const pfuNet = montant * (1 - 0.128 - psRate);
    outPfuNet.textContent = rbFormatEUR(pfuNet);

    const baseAbattue = montant * 0.6;
    const impot = baseAbattue * tmi;
    const ps = montant * psRate;
    const baremeNet = montant - impot - ps;
    outBaremeImpot.textContent = rbFormatEUR(impot);
    outBaremePs.textContent = rbFormatEUR(ps);
    outBaremeNet.textContent = rbFormatEUR(baremeNet);
    const en = rbSimLang() === 'en';
    rbSimChart(form, [{ name: en ? 'Flat tax' : 'PFU', parts: [pfuNet, montant * 0.128, ps] }, { name: en ? 'Income tax scale' : 'Barème', parts: [baremeNet, impot, ps] }], en ? ['Net received', 'Income tax', 'Social levies'] : ['Net perçu', 'Impôt sur le revenu', 'Prélèvements sociaux']);
  }
  document.addEventListener('rb:langchange', compute);

  form.addEventListener('input', compute);
  compute();
}

function initSimKm() {
  const form = document.getElementById('sim-km-form');
  if (!form) return;
  const distanceInput = document.getElementById('sim-km-distance');
  const puissanceInput = document.getElementById('sim-km-puissance');
  const outTaux = document.getElementById('sim-km-taux');
  const outTotal = document.getElementById('sim-km-total');
  const taux = { '3': 0.53, '4': 0.60, '5': 0.63, '6': 0.66, '7': 0.70 };

  function compute() {
    const distance = Math.max(0, parseFloat(distanceInput.value) || 0);
    const rate = taux[puissanceInput.value] || taux['5'];
    outTaux.textContent = rate.toFixed(2).replace('.', ',') + ' €/km';
    outTotal.textContent = rbFormatEUR(distance * rate);
  }

  form.addEventListener('input', compute);
  compute();
}

function initSimRTT() {
  const form = document.getElementById('sim-rtt-form');
  if (!form) return;
  const dureeInput = document.getElementById('sim-rtt-duree');
  const semainesInput = document.getElementById('sim-rtt-semaines');
  const outHeures = document.getElementById('sim-rtt-heures');
  const outJours = document.getElementById('sim-rtt-jours');

  function compute() {
    const duree = Math.max(35, parseFloat(dureeInput.value) || 35);
    const semaines = Math.max(0, parseFloat(semainesInput.value) || 0);
    const heuresSupp = Math.max(0, duree - 35);
    const heuresAn = heuresSupp * semaines;
    const jours = duree > 0 ? heuresAn / (duree / 5) : 0;
    outHeures.textContent = heuresAn.toFixed(0).replace('.', ',') + ' h';
    outJours.textContent = jours.toFixed(1).replace('.', ',') + ' j';
  }

  form.addEventListener('input', compute);
  compute();
}

function initSimActivitePartielle() {
  const form = document.getElementById('sim-partiel-form');
  if (!form) return;
  const tauxHoraireInput = document.getElementById('sim-partiel-taux-horaire');
  const heuresInput = document.getElementById('sim-partiel-heures');
  const outIndemniteHoraire = document.getElementById('sim-partiel-indemnite-horaire');
  const outTotal = document.getElementById('sim-partiel-total');
  const tauxIndemnisation = 0.6;

  function compute() {
    const tauxHoraire = Math.max(0, parseFloat(tauxHoraireInput.value) || 0);
    const heures = Math.max(0, parseFloat(heuresInput.value) || 0);
    const indemniteHoraire = tauxHoraire * tauxIndemnisation;
    outIndemniteHoraire.textContent = rbFormatEUR(indemniteHoraire);
    outTotal.textContent = rbFormatEUR(indemniteHoraire * heures);
  }

  form.addEventListener('input', compute);
  compute();
}

function initSimStatut() {
  const form = document.getElementById('sim-statut-form');
  if (!form) return;
  const associesInput = document.getElementById('sim-statut-associes');
  const caInput = document.getElementById('sim-statut-ca');
  const socialInput = document.getElementById('sim-statut-social');
  const outTitle = document.getElementById('sim-statut-result-title');
  const outDesc = document.getElementById('sim-statut-result-desc');

  function compute() {
    const seul = associesInput.value === 'seul';
    const ca = caInput.value;
    const social = socialInput.value;
    const lang = window.rbI18n ? window.rbI18n.getLang() : 'fr';
    let key = 'sarl';

    if (ca === 'faible' && social === 'peuimporte') {
      key = 'micro';
    } else if (seul) {
      key = social === 'tns' ? 'eurl' : 'sasu';
    } else {
      key = social === 'tns' ? 'sarl' : 'sas';
    }

    outTitle.textContent = window.rbI18n ? window.rbI18n.get(`sim.statut.result.${key}`) : key;
    outDesc.textContent = window.rbI18n ? window.rbI18n.get(`sim.statut.result.${key}_desc`) : '';
  }

  form.addEventListener('input', compute);
  compute();
  document.addEventListener('rb:langchange', compute);
}

document.addEventListener('DOMContentLoaded', () => {
  initSimIS();
  initSimCoutSalarie();
  initSimDirigeant();
  initSimBrutNet();
  initSimTNS();
  initSimDividendes();
  initSimKm();
  initSimRTT();
  initSimActivitePartielle();
  initSimStatut();
});
