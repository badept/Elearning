(function () {
  'use strict';

  var projects = {
    'ACACY PRESENTATION': {
      code: 'ACACY_PRESENTATION',
      name: 'ACACY PRESENTATION',
      customer: 'ACA Office Văn Phòng',
      industries: [
        { code: 'SALES', name: 'Bán hàng' },
        { code: 'ONBOARD', name: 'Hội nhập' },
        { code: 'DISPLAY', name: 'Trưng bày' },
        { code: 'PRODUCT', name: 'Sản phẩm' },
        { code: 'MANAGEMENT', name: 'Quản lý' }
      ],
      channels: [],
      positions: [
        { code: 'SALE', name: 'Nhân viên bán hàng', userType: 'Trainee', permissionGroups: [], note: '' },
        { code: 'NEW_HIRE', name: 'Nhân viên mới', userType: 'Trainee', permissionGroups: [], note: '' },
        { code: 'STORE_MANAGER', name: 'Quản lý cửa hàng', userType: 'Sup', permissionGroups: ['Nghiệp vụ > Hồ sơ nhân viên'], note: 'Quản lý nhân viên tại cửa hàng' },
        { code: 'SUPERVISOR', name: 'Giám sát bán hàng', userType: 'Sup', permissionGroups: ['Nghiệp vụ > Bàn làm việc', 'Nghiệp vụ > Hồ sơ nhân viên'], note: 'Theo dõi đội ngũ bán hàng' }
      ],
      departments: [
        { code: 'BP01', name: 'Bộ phận 01' },
        { code: 'BP02', name: 'Bộ phận 02' }
      ],
      learnerAttributes: [],
      managementLabels: [
        { code: 'MANDATORY', name: 'Đào tạo bắt buộc', competencyExam: false, note: 'Phân loại lịch đào tạo bắt buộc' },
        { code: 'PERIODIC', name: 'Đánh giá định kỳ', competencyExam: true, note: 'Phân loại lịch đánh giá định kỳ' }
      ],
      regions: [],
      areas: [],
      ranks: [],
      stores: [],
      trainers: [],
      otherCategories: [],
      configurations: [],
      tags: [
        { code: 'MANDATORY', name: 'Đào tạo bắt buộc' },
        { code: 'PERIODIC', name: 'Đánh giá định kỳ' }
      ],
      workStatuses: [
        { code: 'ACTIVE', name: 'Đang hoạt động' },
        { code: 'INACTIVE', name: 'Ngưng' }
      ],
      criteria: [
        { code: 'TC01', name: 'Kỹ năng giao tiếp với khách hàng' },
        { code: 'TC02', name: 'Kỹ năng bán hàng' }
      ],
      loginLinks: []
    },
    'ACACY DEMO': {
      code: 'DEMO',
      name: 'ACACY DEMO',
      customer: '',
      learnerPage: 'Webview',
      learnerPageVersion: 'Cũ',
      industries: [
        { code: 'N001', name: 'Ngành 01', note: 'Ghi chú Ngành 01' },
        { code: 'N002', name: 'Ngành 02', note: 'Ghi chú Ngành 02' }
      ],
      channels: [
        { code: 'KENH01', name: 'Kênh 01', note: 'Ghi chú Kênh 01' },
        { code: 'KENH02', name: 'Kênh 02', note: 'Ghi chú Kênh 02' }
      ],
      learnerAttributes: [
        { code: 'TTBS01', name: 'Thuộc tính bổ sung 01' },
        { code: 'TTBS02', name: 'Thuộc tính bổ sung 02' }
      ],
      managementLabels: [
        { code: 'QL01', name: 'Tiêu chí đánh giá 1', competencyExam: true, note: 'Ghi chú Tiêu chí đánh giá 1' },
        { code: 'QL02', name: 'Tiêu chí đánh giá 2', competencyExam: true, note: 'Ghi chú Tiêu chí đánh giá 2' }
      ],
      positions: [
        { code: 'JPG-DEMO-230221-02', name: 'test VT01', userType: 'Trainee', permissionGroups: [], note: '' }
      ],
      departments: [],
      regions: [],
      areas: [
        { code: 'JPG-DEMO-230221-01', name: 'test KV01' },
        { code: 'JPG-DEMO-230221-03', name: 'test KV02' }
      ],
      ranks: [
        { code: 'JPG-DEMO-230221-04', name: 'test CB01' }
      ],
      stores: [],
      trainers: [],
      tags: [
        { code: 'test', name: 'IT Test' }
      ],
      workStatuses: [
        { code: 'TrangThai1', name: 'Trạng thái 1' }
      ],
      otherCategories: [
        { code: 'TTBS01', name: 'Thuộc tính bổ sung 01', note: 'Thuộc tính mở rộng của dự án' }
      ],
      configurations: [],
      criteria: [],
      loginLinks: [
        { code: 'id0489', url: 'https://trainee.acacy.com.vn/id0489', industryCode: 'N001' },
        { code: 'id0490', url: 'https://trainee.acacy.com.vn/id0490', industryCode: 'N002' },
        { code: 'id0491', url: 'https://trainee.acacy.com.vn/id0491', industryCode: '' }
      ],
      loginTypes: [
        'Mã hoặc số điện thoại học viên được cấp tại dự án',
        'Tên đăng nhập và mật khẩu được cấp tại dự án'
      ]
    }
  };

  function emptyProject(input) {
    return {
      code: input.code,
      name: input.name,
      customer: input.customer || '',
      industries: [], channels: [], learnerAttributes: [], managementLabels: [],
      positions: [], departments: [], regions: [], areas: [], ranks: [], stores: [], trainers: [],
      tags: [], otherCategories: [], workStatuses: [], configurations: [], criteria: [], loginLinks: [],
      loginTypes: input.loginTypes || ['Mã hoặc số điện thoại học viên được cấp tại dự án']
    };
  }

  try {
    JSON.parse(window.localStorage.getItem('acasys.customProjects') || '[]').forEach(function (project) {
      if (project && project.name && project.code && !projects[project.name]) projects[project.name] = emptyProject(project);
    });
  } catch (error) {
    // Ignore invalid prototype data and keep the built-in projects available.
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function getName() {
    if (window.AcaProjectScope) return window.AcaProjectScope.get();
    try {
      var saved = window.localStorage.getItem('acasys.currentProject');
      if (projects[saved]) return saved;
    } catch (error) {
      // Use the default project when storage is unavailable.
    }
    return 'ACACY PRESENTATION';
  }

  function get(projectName) {
    return clone(projects[projectName] || projects['ACACY PRESENTATION']);
  }

  function current() {
    return get(getName());
  }

  function list(key, projectName) {
    var project = projects[projectName || getName()] || projects['ACACY PRESENTATION'];
    return clone(project[key] || []);
  }

  function labels(key, projectName) {
    return list(key, projectName).map(function (item) { return item.name; });
  }

  function register(input) {
    if (!input || !input.name || !input.code) return null;
    if (!projects[input.name]) projects[input.name] = emptyProject(input);
    try {
      var custom = JSON.parse(window.localStorage.getItem('acasys.customProjects') || '[]');
      if (!custom.some(function (project) { return project.name === input.name || project.code === input.code; })) {
        custom.push({ name: input.name, code: input.code, customer: input.customer || '', loginTypes: input.loginTypes || [] });
        window.localStorage.setItem('acasys.customProjects', JSON.stringify(custom));
      }
    } catch (error) {
      // The project remains available for the current session when storage is unavailable.
    }
    return get(input.name);
  }

  window.AcaProjectData = {
    all: function () { return Object.keys(projects); },
    get: get,
    current: current,
    list: list,
    labels: labels,
    register: register
  };

  function fieldName(label) {
    var caption = label.querySelector(':scope > span');
    if (caption) return caption.textContent.replace(/\s+/g, ' ').trim().replace(/\s*\*$/, '');
    for (var index = 0; index < label.childNodes.length; index += 1) {
      if (label.childNodes[index].nodeType === 3 && label.childNodes[index].textContent.trim()) {
        return label.childNodes[index].textContent.replace(/\s+/g, ' ').trim().replace(/\s*\*$/, '');
      }
    }
    return '';
  }

  function option(text, value) {
    var node = document.createElement('option');
    node.textContent = text;
    node.value = value;
    return node;
  }

  function syncProjectFields() {
    if (!document.body) return;
    var project = current();
    var mappings = {
      'Bộ phận': { key: 'departments', empty: 'Chưa có bộ phận' },
      'Phòng ban / Bộ phận': { key: 'departments', empty: 'Chưa có bộ phận' },
      'Vị trí': { key: 'positions', empty: 'Chưa có vị trí' },
      'Ngành hàng': { key: 'industries', empty: 'Chưa có ngành hàng', withCode: true },
      'Tiêu chí đào tạo': { key: 'criteria', empty: 'Chưa có tiêu chí trong dự án', withCode: true },
      'Tag 1': { key: 'managementLabels', empty: 'Chưa có nhãn quản lý', withCode: true },
      'Tag 1 (Nhãn quản lý)': { key: 'managementLabels', empty: 'Chưa có nhãn quản lý', withCode: true }
    };

    document.querySelectorAll('label').forEach(function (label) {
      var mapping = mappings[fieldName(label)];
      if (!mapping) return;
      var select = label.querySelector('select, sc-raw-select');
      if (!select) return;
      if (select.getAttribute('data-project-sync') === 'off') return;
      var records = project[mapping.key] || [];
      var hasAll = !!select.querySelector('option[value="all"]');
      var hasPlaceholder = !hasAll && !!select.querySelector('option[value=""], option:first-child');
      var signature = project.name + '|' + mapping.key + '|' + records.map(function (record) { return record.code + ':' + record.name; }).join(',') + '|' + hasAll + '|' + hasPlaceholder;
      if (select.getAttribute('data-project-options') === signature) return;

      while (select.firstChild) select.removeChild(select.firstChild);
      if (hasAll) select.appendChild(option('Tất cả bộ phận', 'all'));
      else if (hasPlaceholder || !records.length) select.appendChild(option(records.length ? 'Chọn…' : mapping.empty, ''));
      records.forEach(function (record) {
        var text = mapping.withCode ? record.code + ' · ' + record.name : record.name;
        select.appendChild(option(text, record.name));
      });
      select.setAttribute('data-project-options', signature);
    });

    if (project.name === 'ACACY DEMO') {
      document.querySelectorAll('.schedule-student-data-row').forEach(function (row) {
        var departmentCell = row.children[2];
        if (departmentCell && departmentCell.textContent.trim() !== '—') departmentCell.textContent = '—';
      });
    }

    document.querySelectorAll('.schedule-level-target-field select').forEach(function (select) {
      select.disabled = true;
      select.title = 'Level mục tiêu được suy ra từ Level của khóa học';
    });
  }

  var projectFieldSyncQueued = false;
  var projectFieldObserver = new MutationObserver(function () {
    if (projectFieldSyncQueued) return;
    projectFieldSyncQueued = true;
    window.requestAnimationFrame(function () {
      projectFieldSyncQueued = false;
      syncProjectFields();
    });
  });
  projectFieldObserver.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncProjectFields);
  else syncProjectFields();
}());
