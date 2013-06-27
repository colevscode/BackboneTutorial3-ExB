App = this.App || {};

App.PhotoView = Backbone.View.extend({
  render: function() {
    var comments = this.options.comments.forFile(this.model.get('file'));
    var params = {
      photo: this.model.toJSON(),
      comments: comments.map(function(c) {return c.toJSON()})
    };
    this.$el.html(Handlebars.templates.photo(params));
    return this;
  },
  events: {
    "submit form": "addComment",
  },
  addComment: function(ev) {
    ev.preventDefault();
    var data = {
      file: $(ev.target).attr("id"),
      text: $(ev.target).find("input").val()
    };
    this.options.comments.create(data);
    this.render();
  }
});


App.GalleryView = Backbone.View.extend({
  render: function() {
    var self = this;
    self.$el.empty();
    self.collection.each(function(photo) {
      var photo = new App.PhotoView({
        model: photo,
        comments: self.options.comments
      });
      self.$el.append(photo.render().el);
    });
    return self;
  },
});
