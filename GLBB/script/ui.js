
function toggleUkuranDasar() {
    document.getElementById('ukuranDasar').classList.add('active');
    document.getElementById('gerakBenda').classList.remove('active');
  }

function toggleKecepatanBenda() {
    document.getElementById('gerakBenda').classList.add('active');
    document.getElementById('ukuranDasar').classList.remove('active');
}

function toggleMain() {
    const menu = document.getElementById('inputMenus');
    if (menu.classList.contains('visible')) {
        menu.classList.remove('visible');
        menu.classList.add('hidden');
    } else {
        menu.classList.remove('hidden');
        menu.classList.add('visible');
    }
}