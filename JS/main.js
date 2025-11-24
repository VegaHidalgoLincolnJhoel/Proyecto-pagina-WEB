// Envío simple de formularios (login y registro)
(function () {
  // Maneja un formulario: id del formulario, ruta php, id del modal, si limpiar al éxito
  const manejar = (formId, phpPath, modalId, limpiar) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true; // evitar dobles envíos

      try {
        const resp = await fetch(phpPath, { method: 'POST', body: new FormData(form) });
        const text = await resp.text(); // el PHP devuelve texto plano
        alert(text); // mostramos el mensaje recibido

        // si el texto tiene el check, cerramos el modal
        if (text.includes('✅') && modalId) {
          const modalEl = document.getElementById(modalId);
          const bsModal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          bsModal.hide();
        }

        // Si fue login exitoso, mostrar usuario en el navbar
        if (text.includes('✅') && phpPath.includes('login.php')) {
          // extraer nombre de '✅ Bienvenido, Nombre'
          const m = text.match(/✅\s*Bienvenido,\s*(.*)/i);
          const name = m ? m[1].trim() : 'Usuario';
          showUser(name);
        }

        // opcional: limpiar formulario si hubo éxito y se pidió
        if (text.includes('✅') && limpiar) form.reset();
      } catch (err) {
        console.error(err);
        alert('Error de red: intenta más tarde.');
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  };

  // Activar para login y registro
  manejar('loginForm', '../PHP/login.php', 'loginModal', false);
  manejar('registerForm', '../PHP/registrar_usuario.php', 'registerModal', true);

  // Mostrar u ocultar elementos del navbar según sesión
  function showUser(name) {
    const regBtn = document.getElementById('navRegisterBtn');
    const loginBtn = document.getElementById('navLoginBtn');
    if (regBtn) regBtn.classList.add('d-none');
    if (loginBtn) loginBtn.classList.add('d-none');
    const navUser = document.getElementById('navUser');
    if (navUser) {
      const nameEl = document.getElementById('navUserName');
      if (nameEl) nameEl.textContent = name;
      navUser.classList.remove('d-none');
    }
  }

  function hideUser() {
    const regBtn = document.getElementById('navRegisterBtn');
    const loginBtn = document.getElementById('navLoginBtn');
    if (regBtn) regBtn.classList.remove('d-none');
    if (loginBtn) loginBtn.classList.remove('d-none');
    const navUser = document.getElementById('navUser');
    if (navUser) navUser.classList.add('d-none');
  }

  // Logout: llamar a PHP y actualizar UI
  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', function (e) {
      e.preventDefault();
      fetch('../PHP/logout.php', { method: 'POST' })
        .then(r => r.text())
        .then(txt => {
          alert(txt);
          hideUser();
        })
        .catch(() => alert('Error al cerrar sesión.'));
    });
  }
})();
