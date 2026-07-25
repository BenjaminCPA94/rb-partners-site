// Simulateurs — estimations indicatives calculées côté client (voir avertissement sur chaque page).
function rbFormatEUR(value) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
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
  }

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
  }

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
  }

  form.addEventListener('input', compute);
  compute();
}

document.addEventListener('DOMContentLoaded', () => {
  initSimIS();
  initSimCoutSalarie();
  initSimDirigeant();
});
