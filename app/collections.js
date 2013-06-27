App = this.App || {};

App.Photos = Backbone.Collection.extend({
  url: "/backlift/toc/photos"
});

App.Comments = Backbone.Collection.extend({
  url: "/backlift/data/comments",
  forFile: function(file) {
    return this.filter(function(item) {
      return item.get('file') == file;
    });
  }
});