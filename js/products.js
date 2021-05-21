const app = {
  el: {
    productList: document.getElementById('productList'),
    productCount: document.getElementById('productCount')
  },
  data: {
    url: 'https://vue3-course-api.hexschool.io/',
    path: 'jayredk-hex',
    productData: []
  },
  getProducts() {
    axios.get(`${this.data.url}api/${this.data.path}/admin/products`)
    .then((res) => {
      if (res.data.success) {
        this.data.productData = res.data.products;
        this.render();
      } else {
        alert('你需要重新登入');
        window.location = 'login.html';
      }
    })
    .catch((error) => console.log(error));
  },
  deleteProduct(id) {
    const index = this.data.productData.findIndex((item) => item.id === id);
    this.data.productData.splice(index, 1);

    axios.delete(`${this.data.url}api/${this.data.path}/admin/product/${id}`)
    .then((res) => {
      if (res.data.success) {console.log(res.data.message);}
    })
    .catch((error) => console.log(error));
  },
  deleteOrComplete(e) {
    const action = e.target.dataset.action;
    const id = e.target.dataset.id;

    if (action === 'remove' && confirm("不要刪掉\n罷脫啦\n有話好說")) {
      this.deleteProduct(id);
      this.render()
      
    } else if (action === 'complete') {
      return e.target.parentElement.lastElementChild.textContent = e.target.checked ? '啟用' : '未啟用';
    }
  },
  render() {
    let str = '';

    this.data.productData.forEach((item) => {
      str += `
    <tr>
      <td>${item.title}</td>
      <td width="120">
        ${item.origin_price}
      </td>
      <td width="120">
        ${item.price}
      </td>
      <td width="100">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="${item.id}" ${
            item.is_enabled ? "checked" : ""
          } data-action="complete" data-id="${item.id}">
          <label class="form-check-label" data-action="complete" data-id="${item.id}" for="${item.id}">${
            item.is_enabled ? "啟用" : "未啟用"
          }</label>
        </div>
      </td>
      <td width="120">
        <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${item.id}"> 刪除 </button>
      </td>
    </tr>`;
    })
    this.el.productList.innerHTML = str;
    this.el.productCount.textContent = this.data.productData.length;
  },
  created() {
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('hextoken='))
        .split('=')[1];

    axios.defaults.headers.common['Authorization'] = token;

    this.getProducts();
    this.el.productList.addEventListener('click', this.deleteOrComplete.bind(this));
  }
};

app.created();