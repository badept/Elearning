(function () {
  'use strict';

  var storageKey = 'acasys.sidebar.collapsed';
  var projectStorageKey = 'acasys.currentProject';
  var projects = ['ACACY PRESENTATION', 'ACACY DEMO'];
  var sidebarSelector = '.app-sidebar, .ui-sidebar-a50515f';
  var icons = {
    'Học viên': 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    'Chương trình': 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    'Khóa học': 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15zM6.5 17A2.5 2.5 0 0 0 4 19.5 2.5 2.5 0 0 0 6.5 22H20v-5',
    'Lịch học/thi': 'M3 5h18v16H3zM16 3v4M8 3v4M3 10h18',
    'Lộ trình đào tạo': 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    'Dự án đào tạo': 'M3 6a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
  };

  function isCollapsed() {
    try {
      return window.localStorage.getItem(storageKey) === '1';
    } catch (error) {
      return false;
    }
  }

  function saveCollapsed(value) {
    try {
      window.localStorage.setItem(storageKey, value ? '1' : '0');
    } catch (error) {
      // The navigation remains functional when storage is unavailable.
    }
  }

  function getCurrentProject() {
    try {
      var saved = window.localStorage.getItem(projectStorageKey);
      return projects.indexOf(saved) !== -1 ? saved : projects[0];
    } catch (error) {
      return projects[0];
    }
  }

  function setCurrentProject(project) {
    if (projects.indexOf(project) === -1) return;
    try {
      window.localStorage.setItem(projectStorageKey, project);
    } catch (error) {
      // Keep the selector usable even when storage is unavailable.
    }
    window.dispatchEvent(new CustomEvent('acasys:projectchange', { detail: { project: project } }));
    window.location.reload();
  }

  window.AcaProjectScope = {
    get: getCurrentProject,
    set: setCurrentProject,
    all: projects.slice()
  };

  function isProjectButton(button) {
    var meta = button.querySelector('.meta-text, .ui-label-6e5e314');
    return !!meta && meta.textContent.replace(/\s+/g, ' ').trim() === 'Dự án';
  }

  function ensureProjectMenu() {
    var menu = document.querySelector('.global-project-menu');
    if (menu) return menu;
    menu = document.createElement('div');
    menu.className = 'global-project-menu';
    menu.hidden = true;
    menu.innerHTML = '<strong>Chọn dự án làm việc</strong><button type="button" data-project="ACACY PRESENTATION">ACACY PRESENTATION</button><button type="button" data-project="ACACY DEMO">ACACY DEMO</button><small>Tất cả module sẽ hiển thị dữ liệu thuộc dự án đã chọn.</small>';
    document.body.appendChild(menu);
    return menu;
  }

  function syncProjectSelector() {
    var current = getCurrentProject();
    document.documentElement.setAttribute('data-current-project', current);
    document.querySelectorAll('button').forEach(function (button) {
      if (!isProjectButton(button)) return;
      button.classList.add('global-project-trigger');
      button.setAttribute('aria-haspopup', 'menu');
      button.setAttribute('aria-expanded', 'false');
      var value = button.querySelector('.strong-text, .ui-label-7e6ddec');
      if (value && value.textContent !== current) value.textContent = current;
    });
    document.querySelectorAll('label').forEach(function (label) {
      var select = label.querySelector('select');
      if (!select) return;
      var labelText = label.textContent.replace(/\s+/g, ' ').trim();
      if (labelText.indexOf('Dự án đào tạo') !== 0 && labelText.indexOf('Dự án ') !== 0) return;
      if (select.options.length !== 1 || select.options[0].textContent !== current) {
        select.innerHTML = '';
        var option = document.createElement('option');
        option.textContent = current;
        select.appendChild(option);
      }
      select.disabled = true;
      select.setAttribute('title', 'Dự án được lấy theo phạm vi đang chọn trên thanh đầu trang');
    });
    var menu = ensureProjectMenu();
    menu.querySelectorAll('[data-project]').forEach(function (option) {
      var active = option.getAttribute('data-project') === current;
      option.classList.toggle('is-current', active);
      option.setAttribute('aria-current', active ? 'true' : 'false');
      var optionLabel = (active ? '✓ ' : '') + option.getAttribute('data-project');
      if (option.textContent !== optionLabel) option.textContent = optionLabel;
    });
  }

  function getLabel(link) {
    var label = link.querySelector('span');
    return label ? label.textContent.replace(/\s+/g, ' ').trim() : '';
  }

  function syncIcons(sidebar) {
    sidebar.querySelectorAll('a').forEach(function (link) {
      var label = getLabel(link);
      var path = link.querySelector('svg path');
      if (path && icons[label] && path.getAttribute('d') !== icons[label]) {
        path.setAttribute('d', icons[label]);
      }
      if (label && link.getAttribute('title') !== label) {
        link.setAttribute('title', label);
      }
    });
  }

  function updateToggle(toggle, collapsed) {
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.setAttribute('aria-label', collapsed ? 'Mở rộng menu' : 'Thu gọn menu');
    toggle.setAttribute('title', collapsed ? 'Mở rộng menu' : 'Thu gọn menu');
  }

  function ensureToggle(sidebar) {
    var brand = sidebar.querySelector('.brand-row');
    if (!brand) return;

    var toggle = brand.querySelector('.sidebar-collapse-toggle');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'sidebar-collapse-toggle';
      toggle.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      brand.appendChild(toggle);
    }
    updateToggle(toggle, isCollapsed());
  }

  function synchronizeNavigation() {
    var root = document.querySelector('#dc-root');
    if (!root) return;

    var collapsed = isCollapsed();
    root.classList.toggle('sidebar-is-collapsed', collapsed);
    root.querySelectorAll(sidebarSelector).forEach(function (sidebar) {
      ensureToggle(sidebar);
      syncIcons(sidebar);
    });
    syncProjectSelector();
  }

  document.addEventListener('click', function (event) {
    var projectOption = event.target.closest('.global-project-menu [data-project]');
    if (projectOption) {
      event.preventDefault();
      event.stopPropagation();
      setCurrentProject(projectOption.getAttribute('data-project'));
      return;
    }

    var projectTrigger = event.target.closest('.global-project-trigger');
    if (projectTrigger) {
      event.preventDefault();
      event.stopImmediatePropagation();
      var projectMenu = ensureProjectMenu();
      var rect = projectTrigger.getBoundingClientRect();
      projectMenu.style.left = Math.max(12, Math.min(rect.left, window.innerWidth - 300)) + 'px';
      projectMenu.style.top = (rect.bottom + 8) + 'px';
      projectMenu.hidden = !projectMenu.hidden;
      document.querySelectorAll('.global-project-trigger').forEach(function (button) {
        button.setAttribute('aria-expanded', String(button === projectTrigger && !projectMenu.hidden));
      });
      return;
    }

    var openProjectMenu = document.querySelector('.global-project-menu:not([hidden])');
    if (openProjectMenu && !event.target.closest('.global-project-menu')) {
      openProjectMenu.hidden = true;
      document.querySelectorAll('.global-project-trigger').forEach(function (button) {
        button.setAttribute('aria-expanded', 'false');
      });
    }

    var toggle = event.target.closest('.sidebar-collapse-toggle');
    if (!toggle) return;

    var root = toggle.closest('#dc-root');
    if (!root) return;

    var collapsed = !root.classList.contains('sidebar-is-collapsed');
    root.classList.toggle('sidebar-is-collapsed', collapsed);
    saveCollapsed(collapsed);
    root.querySelectorAll('.sidebar-collapse-toggle').forEach(function (button) {
      updateToggle(button, collapsed);
    });
  });

  var queued = false;
  var observer = new MutationObserver(function () {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(function () {
      queued = false;
      synchronizeNavigation();
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', synchronizeNavigation);
  } else {
    synchronizeNavigation();
  }
}());
