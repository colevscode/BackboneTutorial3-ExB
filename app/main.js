App = this.App || {};

function withCollections(collections, fn) {
  _.each(collections, function(col) {
    col.fetch({
      success: function() {
        col.fetched = true;
        var done = _.every(collections, function(item) {
          return item.fetched == true;
        });
        if (done) {
          fn.call();
        }
      }
    })
  });
}

function main() {
  App.photos = new App.Photos();
  App.comments = new App.Comments();

  App.gallery = new App.GalleryView({ 
    collection: App.photos,
    comments: App.comments,
    el: "#gallery",
  });

  withCollections([App.photos, App.comments], function() {
    App.gallery.render();
  });
}

// run main() on page load
$(main);