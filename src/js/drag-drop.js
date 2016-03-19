var zone = new FileDrop('drag-drop', { input: false });

zone.event('upload', function (e) {
  while (cleared = zone.el.firstChild) {
    zone.el.removeChild(zone.el.firstChild);
  }

  var error = function () { alert('Problem reading the file system.'); }

  var done = function (files) {
    // files is standard FileDrop's FileList object.
    files.each(function (file) {
      // file is FileDrop.File with native objects accessible
      // as file.nativeFile and file.nativeEntry.
      console.log("duchcic");
      // file.sendTo('/');
      var node = document.createElement('p');
      node.innerText = file.name

      if (file.nativeFile) {
        // This is a file. We can use any FileDrop method here
        // like sendTo() and readData() - see below.
        node.innerText += ' (' + file.size + ')';
      } else {
        // This is a directory - it has no File API object.
        node.innerHTML = '<b>' + node.innerHTML + '/</b>';
      }

      zone.el.appendChild(node);
    });
  };

  zone.eventFiles(e).each(function (root) {
    if (root.listEntries(done, error)) {
      // Success.
    } else if (!root.nativeEntry) {
      zone.el.innerHTML = '<p><b>File System API is not' +
                          ' supported by this browser.</b></p>';
    } else {
      zone.el.innerHTML = '<p><b>Problem listing ' +
                          root.name + '.</b></p>';
    }
  });
});