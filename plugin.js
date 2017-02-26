const plugin = (options) => {
  let seneca = this;
  /**
   * 获取所有商品列表
   */
  seneca.add({ area: 'product', action: 'fetch' }, (args, done) => {
    let products = this.make('products');
    products.list$({}, done);
  });
  /**
   * 根据分类获取商品列表
   */
  seneca.add({ area: 'product', action: 'fetch', criteria: 'byCategory' }, (args, done) => {
    let products = this.make('products');
    products.list$({ category: args.category }, done);
  });
  /**
   * 根据id获取商品
   */
  seneca.add({ area: 'product', action: 'fetch', criteria: 'byId' }, (args, done) => {
    let product = this.make('products');
    product.load$(args.id, done);
  });
  /**
   * 添加商品
   */
  seneca.add({ area: 'product', action: 'add' }, (args, doen) => {
    let products = this.make('products');
    products.category = args.category;
    products.name = args.name;
    products.description = args.description;
    products.price = args.price;
    products.save$((err, product) => {
      done(err, products.data$(false));
    });
  });
  /**
   * 根据id删除商品
   */
  seneca.add({ area: 'product', action: 'remove' }, (args, done) => {
    let product = this.make('products');
    product.remove$(args.id, (err) => {
      done(err, null);
    });
  });
  /**
   * 根据id获取商品信息并编辑
   */
  seneca.add({ area: 'product', action: 'edit' }, (args, done) => {
    seneca.act({ area: 'product', action: 'fetch', criteria: 'byId', id: args.id }, (err, result) => {
      result.data$({
        name: args.name,
        category: args.category,
        description: args.description,
        price: args.price
      });
      result.save$((err, product) => {
        done(err, product.data$(false));
      });
    });
  });
} 

module.exports = plugin;