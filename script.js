/* BOE STORE — standalone static version */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "2348136723877";
  var STORAGE_KEY = "boe_store_products_v1";
  var ADMIN_ID = "admin@boestore.ng";
  var ADMIN_PASSWORD = "boe1234";
  var memoryStore = {};

  var DEFAULT_PRODUCTS = [
    { id: "baggy-jean-01", name: "Baggy Denim 01", category: "Jeans", price: 25000, image: "Asset/Jeans/WhatsApp Image 2026-06-11 at 11.13.44.jpeg" },
    { id: "baggy-jean-02", name: "Baggy Denim 02", category: "Jeans", price: 25000, image: "Asset/Jeans/WhatsApp Image 2026-06-11 at 11.13.48 (1).jpeg" },
    { id: "baggy-jean-03", name: "Baggy Denim 03", category: "Jeans", price: 27000, image: "Asset/Jeans/WhatsApp Image 2026-06-11 at 11.13.48.jpeg" },
    { id: "baggy-jean-04", name: "Baggy Denim 04", category: "Jeans", price: 27000, image: "Asset/Jeans/WhatsApp Image 2026-06-11 at 11.13.49.jpeg" },
    { id: "baggy-jean-05", name: "Baggy Denim 05", category: "Jeans", price: 28000, image: "Asset/Jeans/WhatsApp Image 2026-06-11 at 11.13.52 (1).jpeg" },
    { id: "baggy-jean-06", name: "Baggy Denim 06", category: "Jeans", price: 28000, image: "Asset/Jeans/WhatsApp Image 2026-06-11 at 11.13.52 (2).jpeg" },
    { id: "baggy-jean-07", name: "Baggy Denim 07", category: "Jeans", price: 30000, image: "Asset/Jeans/WhatsApp Image 2026-06-11 at 11.13.52.jpeg" },
    { id: "baggy-jean-08", name: "Baggy Denim 08", category: "Jeans", price: 30000, image: "Asset/Jeans/WhatsApp Image 2026-06-11 at 11.13.53.jpeg" },
    { id: "baggy-jean-09", name: "Baggy Denim 09", category: "Jeans", price: 32000, image: "Asset/Jeans/WhatsApp Image 2026-06-11 at 11.09.26.jpeg" },
    { id: "plain-long-tee-01", name: "Plain Long Tee 01", category: "Long Tee", price: 15000, image: "Asset/Plain long Tee/WhatsApp Image 2026-06-11 at 11.02.53.jpeg" },
    { id: "plain-long-tee-02", name: "Plain Long Tee 02", category: "Long Tee", price: 15000, image: "Asset/Plain long Tee/WhatsApp Image 2026-06-11 at 11.09.59.jpeg" },
    { id: "plain-white-tee-01", name: "Plain White Tee 01", category: "White Tee", price: 12000, image: "Asset/Plain white Tees/WhatsApp Image 2026-06-11 at 11.05.50.jpeg" },
    { id: "plain-white-tee-02", name: "Plain White Tee 02", category: "White Tee", price: 12000, image: "Asset/Plain white Tees/WhatsApp Image 2026-06-11 at 11.05.51.jpeg" },
    { id: "plain-white-tee-03", name: "Plain White Tee 03", category: "White Tee", price: 12000, image: "Asset/Plain white Tees/WhatsApp Image 2026-06-11 at 11.05.51 (1).jpeg" },
    { id: "plain-white-tee-04", name: "Plain White Tee 04", category: "White Tee", price: 13000, image: "Asset/Plain white Tees/WhatsApp Image 2026-06-11 at 11.07.27.jpeg" },
    { id: "featured-01", name: "Featured Piece 01", category: "Featured", price: 35000, image: "Asset/WhatsApp Image 2026-06-11 at 11.03.02.jpeg" },
    { id: "featured-02", name: "Featured Piece 02", category: "Featured", price: 35000, image: "Asset/WhatsApp Image 2026-06-11 at 11.08.28.jpeg" },
    { id: "featured-03", name: "Featured Piece 03", category: "Featured", price: 35000, image: "Asset/WhatsApp Image 2026-06-11 at 11.08.55.jpeg" }
  ];

  var CATEGORIES = ["All", "Jeans", "Long Tee", "White Tee", "Featured"];
  var PRODUCTS = loadProducts();

  function loadProducts() {
    var stored = safeRead(STORAGE_KEY);
    if (stored && Array.isArray(stored) && stored.length) {
      return stored;
    }
    safeWrite(STORAGE_KEY, DEFAULT_PRODUCTS.slice());
    return DEFAULT_PRODUCTS.slice();
  }

  function safeRead(key) {
    try {
      var data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      return memoryStore[key] ? JSON.parse(memoryStore[key]) : null;
    }
  }

  function safeWrite(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      memoryStore[key] = JSON.stringify(value);
    }
  }

  function naira(n) { return "\u20A6" + Number(n || 0).toLocaleString("en-NG"); }
  function wa(msg) { return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg); }
  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* WhatsApp links */
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.href = wa(el.getAttribute("data-wa"));
  });

  /* Hero images */
  var heroA = document.getElementById("heroA");
  if (heroA) heroA.src = PRODUCTS[15].image;
  var heroB = document.getElementById("heroB");
  if (heroB) heroB.src = PRODUCTS[0].image;

  /* Marquee */
  var words = ["Wear the Confidence", "◆", "Move the Culture", "◆", "Lagos → Nationwide", "◆", "Limited Drops", "◆"];
  var track = document.getElementById("marquee");
  if (track) {
    var line = words.join("&nbsp;&nbsp;&nbsp;&nbsp;");
    track.innerHTML = "<span>" + line + "</span><span>" + line + "</span>";
  }

  /* Sticky nav */
  var nav = document.getElementById("nav");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Shared tile builder (used by both the home-page teaser and the full grid) */
  function buildTile(p) {
    var tile = document.createElement("article");
    tile.className = "tile";
    tile.tabIndex = 0;

    var badge = "";
    if (String(p.id).indexOf("custom-") === 0) {
      badge = '<span class="tile-badge">New</span>';
    } else if (p.category === "Featured") {
      badge = '<span class="tile-badge subtle">Fan Favorite</span>';
    }

    tile.innerHTML =
      badge +
      '<img loading="lazy" alt="' + escapeHtml(p.name) + '" src="' + p.image + '" />' +
      '<div class="tile-meta"><div><strong>' + escapeHtml(p.name) + '</strong><span>' + escapeHtml(p.category) + '</span></div><span class="item-price">' + naira(p.price) + '</span></div>';
    tile.addEventListener("click", function () { openModal(p); });
    tile.addEventListener("keydown", function (e) { if (e.key === "Enter") openModal(p); });
    addTilt(tile);
    return tile;
  }

  /* Featured teaser (home page) — a small curated slice, not the whole catalog */
  function renderFeatured() {
    var featuredGrid = document.getElementById("featuredGrid");
    if (!featuredGrid) return;
    featuredGrid.innerHTML = "";

    var picks = PRODUCTS.filter(function (p) { return p.category === "Featured"; });
    if (picks.length < 3) {
      PRODUCTS.forEach(function (p) {
        if (picks.length < 3 && picks.indexOf(p) === -1) picks.push(p);
      });
    }
    picks.slice(0, 3).forEach(function (p) { featuredGrid.appendChild(buildTile(p)); });
  }
  var grid = document.getElementById("grid");
  var filters = document.getElementById("filters");
  var active = "All";

  CATEGORIES.forEach(function (cat) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = cat;
    b.className = cat === active ? "active" : "";
    b.addEventListener("click", function () {
      active = cat;
      filters.querySelectorAll("button").forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      render();
    });
    filters.appendChild(b);
  });

  function render() {
    grid.innerHTML = "";
    PRODUCTS.filter(function (p) { return active === "All" || p.category === active; })
      .forEach(function (p) { grid.appendChild(buildTile(p)); });
    renderFeatured();
  }

  /* 3D tilt on hover */
  function addTilt(el) {
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      var rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
      var ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
      el.style.transform = "rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-6px)";
    });
    el.addEventListener("mouseleave", function () { el.style.transform = ""; });
  }

  /* Modal */
  var modal = document.getElementById("modal");
  function openModal(p) {
    document.getElementById("mImg").src = p.image;
    document.getElementById("mImg").alt = p.name;
    document.getElementById("mCat").textContent = "◢ " + p.category;
    document.getElementById("mName").textContent = p.name;
    document.getElementById("mPrice").textContent = naira(p.price);
    document.getElementById("mOrder").href = wa(
      "Hello BOE STORE, I want to order the " + p.name + " (" + naira(p.price) + ")."
    );
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
  modal.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  /* Admin flow */
  var adminModal = document.getElementById("adminModal");
  var adminLoginView = document.getElementById("adminLoginView");
  var adminDashboard = document.getElementById("adminDashboard");
  var adminLoginStatus = document.getElementById("adminLoginStatus");
  var productFormStatus = document.getElementById("productFormStatus");
  var adminInventory = document.getElementById("adminInventory");

  function openAdmin() {
    adminModal.hidden = false;
    document.body.style.overflow = "hidden";
    adminLoginView.hidden = false;
    adminDashboard.hidden = true;
    adminLoginStatus.textContent = "";
    document.getElementById("adminId").value = "";
    document.getElementById("adminPassword").value = "";
  }

  function closeAdmin() {
    adminModal.hidden = true;
    document.body.style.overflow = "";
  }

  function authenticateAdmin(id, password) {
    return id.trim() === ADMIN_ID && password.trim() === ADMIN_PASSWORD;
  }

  function renderAdminInventory() {
    adminInventory.innerHTML = "";

    PRODUCTS.forEach(function (product) {
      var item = document.createElement("div");
      item.className = "admin-item";

      var imageWrap = document.createElement("div");
      imageWrap.className = "admin-item-image";
      var img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      imageWrap.appendChild(img);

      var formFields = document.createElement("div");
      formFields.className = "admin-item-fields";

      var nameLabel = document.createElement("label");
      nameLabel.textContent = "Name";
      var nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.value = product.name;
      nameLabel.appendChild(nameInput);

      var categoryLabel = document.createElement("label");
      categoryLabel.textContent = "Category";
      var categorySelect = document.createElement("select");
      CATEGORIES.filter(function (c) { return c !== "All"; }).forEach(function (category) {
        var option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        if (category === product.category) {
          option.selected = true;
        }
        categorySelect.appendChild(option);
      });
      categoryLabel.appendChild(categorySelect);

      var priceLabel = document.createElement("label");
      priceLabel.textContent = "Price";
      var priceInput = document.createElement("input");
      priceInput.type = "number";
      priceInput.min = "1000";
      priceInput.step = "100";
      priceInput.value = String(product.price);
      priceLabel.appendChild(priceInput);

      var actions = document.createElement("div");
      actions.className = "admin-item-actions";
      var saveBtn = document.createElement("button");
      saveBtn.type = "button";
      saveBtn.textContent = "Save";
      saveBtn.className = "btn-gold";
      saveBtn.addEventListener("click", function () {
        updateProduct(product.id, nameInput.value, categorySelect.value, Number(priceInput.value));
      });

      var deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "btn-outline btn-mini";
      deleteBtn.addEventListener("click", function () {
        if (confirm("Remove \"" + product.name + "\" from the gallery?")) {
          PRODUCTS = PRODUCTS.filter(function (entry) { return entry.id !== product.id; });
          safeWrite(STORAGE_KEY, PRODUCTS);
          render();
          renderAdminInventory();
        }
      });

      actions.appendChild(saveBtn);
      actions.appendChild(deleteBtn);

      formFields.appendChild(nameLabel);
      formFields.appendChild(categoryLabel);
      formFields.appendChild(priceLabel);
      item.appendChild(imageWrap);
      item.appendChild(formFields);
      item.appendChild(actions);
      adminInventory.appendChild(item);
    });
  }

  function updateProduct(id, name, category, price) {
    var product = PRODUCTS.find(function (entry) { return entry.id === id; });
    if (!product) {
      return;
    }

    product.name = name.trim() || product.name;
    product.category = category || product.category;
    product.price = Number(price) || product.price;

    safeWrite(STORAGE_KEY, PRODUCTS);
    render();
    renderAdminInventory();
    productFormStatus.textContent = "Product updated successfully.";
  }

  document.querySelectorAll("[data-admin-open]").forEach(function (button) {
    button.addEventListener("click", openAdmin);
  });

  document.querySelectorAll("[data-admin-close]").forEach(function (button) {
    button.addEventListener("click", closeAdmin);
  });

  document.getElementById("adminLoginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var id = document.getElementById("adminId").value;
    var password = document.getElementById("adminPassword").value;

    if (authenticateAdmin(id, password)) {
      adminLoginView.hidden = true;
      adminDashboard.hidden = false;
      renderAdminInventory();
      adminLoginStatus.textContent = "";
      return;
    }

    adminLoginStatus.textContent = "Invalid login ID or password.";
  });

  document.getElementById("adminLogout").addEventListener("click", function () {
    adminLoginView.hidden = false;
    adminDashboard.hidden = true;
    document.getElementById("adminId").value = "";
    document.getElementById("adminPassword").value = "";
    adminLoginStatus.textContent = "Logged out.";
  });

  document.getElementById("productForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var fileInput = document.getElementById("newProductImage");
    var name = document.getElementById("newProductName").value.trim();
    var category = document.getElementById("newProductCategory").value;
    var price = Number(document.getElementById("newProductPrice").value) || 0;

    if (!name || !price) {
      productFormStatus.textContent = "Please add a name and a valid price.";
      return;
    }

    if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader();
      reader.onload = function () {
        PRODUCTS.unshift({
          id: "custom-" + Date.now(),
          name: name,
          category: category,
          price: price,
          image: reader.result
        });

        safeWrite(STORAGE_KEY, PRODUCTS);
        render();
        renderAdminInventory();
        event.target.reset();
        productFormStatus.textContent = "New product uploaded successfully.";
      };
      reader.readAsDataURL(fileInput.files[0]);
      return;
    }

    PRODUCTS.unshift({
      id: "custom-" + Date.now(),
      name: name,
      category: category,
      price: price,
      image: DEFAULT_PRODUCTS[0].image
    });

    safeWrite(STORAGE_KEY, PRODUCTS);
    render();
    renderAdminInventory();
    event.target.reset();
    productFormStatus.textContent = "New product added successfully.";
  });

  /* Reveal on scroll */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.style.animation = "rise .8s cubic-bezier(.22,1,.36,1) both";
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".section .wrap > *, .cards article").forEach(function (el) { io.observe(el); });
  }

  document.getElementById("year").textContent = "© " + new Date().getFullYear();
  render();
})();