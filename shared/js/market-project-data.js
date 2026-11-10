(function () {
  'use strict';

  var storageKey = 'acasys.marketProjects.v1';
  var trainingProjectLinkKey = 'acasys.trainingProjectMarketLinks.v1';
  var seed = [
    {
      id: 'market-acacy-sales',
      code: 'MKT-ACACY-SALES',
      name: 'Dự án nhân sự thị trường ACACY',
      sourceUrl: 'https://erp.acacy.vn/api/market-project/employees',
      status: 'active',
      employees: [
        { id: 'mkt-001', code: 'FS001', name: 'Nguyễn Minh Anh', phone: '0901234567', email: 'minhanh@acacy.vn', department: 'Đội bán hàng', position: 'Nhân viên bán hàng', area: 'TP. Hồ Chí Minh', status: 'active' },
        { id: 'mkt-002', code: 'FS002', name: 'Trần Quốc Bảo', phone: '0902345678', email: 'quocbao@acacy.vn', department: 'Đội bán hàng', position: 'Nhân viên trưng bày', area: 'Bình Dương', status: 'active' },
        { id: 'mkt-003', code: 'SUP001', name: 'Lê Hoàng Nam', phone: '0903456789', email: 'hoangnam@acacy.vn', department: 'Giám sát thị trường', position: 'Giám sát bán hàng', area: 'Đồng Nai', status: 'active' }
      ]
    }
  ];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function read() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(storageKey));
      if (Array.isArray(saved)) return saved;
    } catch (error) {
      // Fall back to sample data when storage is unavailable or malformed.
    }
    return clone(seed);
  }

  function write(projects) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(projects));
    } catch (error) {
      // The prototype remains usable in memory when storage is unavailable.
    }
    window.dispatchEvent(new CustomEvent('acasys:marketprojectschange'));
    return projects;
  }

  function normalizeProject(project) {
    return {
      id: project.id || 'market-' + Date.now(),
      code: String(project.code || '').trim().toUpperCase(),
      name: String(project.name || '').trim(),
      sourceUrl: String(project.sourceUrl || '').trim(),
      status: project.status === 'inactive' ? 'inactive' : 'active',
      employees: Array.isArray(project.employees) ? project.employees : []
    };
  }

  function upsertProject(project) {
    var projects = read();
    var normalized = normalizeProject(project);
    var index = projects.findIndex(function (item) { return item.id === normalized.id; });
    if (index === -1) projects.push(normalized); else projects[index] = normalized;
    write(projects);
    return normalized;
  }

  function removeProject(id) {
    return write(read().filter(function (project) { return project.id !== id; }));
  }

  function upsertEmployee(projectId, employee) {
    var projects = read();
    var project = projects.find(function (item) { return item.id === projectId; });
    if (!project) return null;
    var normalized = Object.assign({
      id: 'market-employee-' + Date.now(), code: '', name: '', phone: '', email: '', department: '', position: '', area: '', status: 'active'
    }, employee);
    normalized.code = String(normalized.code || '').trim().toUpperCase();
    normalized.name = String(normalized.name || '').trim();
    var index = project.employees.findIndex(function (item) { return item.id === normalized.id; });
    if (index === -1) project.employees.push(normalized); else project.employees[index] = normalized;
    write(projects);
    return normalized;
  }

  function removeEmployee(projectId, employeeId) {
    var projects = read();
    var project = projects.find(function (item) { return item.id === projectId; });
    if (!project) return projects;
    project.employees = project.employees.filter(function (employee) { return employee.id !== employeeId; });
    return write(projects);
  }

  function readTrainingProjectLinks() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(trainingProjectLinkKey) || '{}');
      return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
    } catch (error) {
      return {};
    }
  }

  function setTrainingProjectLink(trainingProjectName, marketProjectId) {
    var links = readTrainingProjectLinks();
    var key = String(trainingProjectName || '').trim();
    if (!key) return null;
    if (marketProjectId) links[key] = marketProjectId; else delete links[key];
    try {
      window.localStorage.setItem(trainingProjectLinkKey, JSON.stringify(links));
    } catch (error) {
      // Keep the current screen usable when storage is unavailable.
    }
    window.dispatchEvent(new CustomEvent('acasys:marketprojectlinkchange'));
    return marketProjectId || '';
  }

  function getTrainingProjectLink(trainingProjectName) {
    return readTrainingProjectLinks()[String(trainingProjectName || '').trim()] || '';
  }

  window.AcaMarketProjectData = {
    all: function () { return clone(read()); },
    get: function (id) { return clone(read().find(function (project) { return project.id === id; }) || null); },
    upsertProject: upsertProject,
    removeProject: removeProject,
    upsertEmployee: upsertEmployee,
    removeEmployee: removeEmployee,
    setTrainingProjectLink: setTrainingProjectLink,
    getTrainingProjectLink: getTrainingProjectLink
  };
}());
