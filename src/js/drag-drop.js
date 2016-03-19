(function(fd, FileDrop) {
  var active = new fd.FileList();
  var zone = new FileDrop('drag-drop', {
  });

  zone.multiple(true);

  zone.event('upload', function (e) {
    zone.eventFiles(e).each(function (root) {
      var ok = root.listEntries(
        function (files) {
          files.ofType("(text|image)").each(function (file) {
            file.sendTo('http://localhost:3000/upload');
          })
        },
        function (e) {
          alert('Problem reading the file system: ' + e.code)
        }
      )

      ok || alert('Cannot list ' + root.name + ' - unsupported?')
    })
  })
})(window.fd, window.FileDrop);