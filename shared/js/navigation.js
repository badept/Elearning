(function () {
  'use strict';

  var storageKey = 'acasys.sidebar.collapsed';
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
  }

  document.addEventListener('click', function (event) {
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
