let productsInCart=localStorage.getItem("products-in-cart");productsInCart=JSON.parse(productsInCart);const cartProducts=document.querySelector("#cart-products"),emptyCart=document.querySelector("#empty-cart"),cartActions=document.querySelector("#cart-actions"),cartActionsBuy=document.querySelector("#cart-actions-buy"),cartBought=document.querySelector("#cart-bought"),cartActionsEmpty=document.querySelector("#cart-actions-empty"),total=document.querySelector("#total");let cartProductDelete=document.querySelectorAll(".cart-product-delete"),cartProductReduce=document.querySelector("cart-product-reduce"),amount=document.querySelector("amount");function loadCartProducts(){productsInCart&&productsInCart.length>0?(emptyCart.classList.add("disabled"),cartProducts.classList.remove("disabled"),cartActions.classList.remove("disabled"),cartBought.classList.add("disabled"),cartProducts.innerHTML="",productsInCart.forEach(t=>{let r=document.createElement("div");r.classList.add("cart-product"),r.innerHTML=`
        
                    <img src="${t.image}" alt="${t.title}">
                    <div class="cart-product-title">
                        <small>Title</small>
                        <h3>${t.title}</h3>
                    </div>
                    <div class="cart-product-amount">
                        <small>Amount</small>
                        <p class="amount">${t.quantity}</p>
                    </div>
                    <div class="cart-product-price">
                         <small>Price</small>
                         <p>$${t.price}</p>
                    </div>
                    <div class="cart-product-subtotal">
                        <small>Subtotal</small>
                        <p>$${t.price*t.quantity}</p>
                    </div>
                    <button class="cart-product-reduce" id="${t.id}">Reduce amount</button>
                    <button class="cart-product-delete" id="${t.id}"><i class="bi bi-trash-fill"></i></button>
            
            `,cartProducts.append(r)})):(emptyCart.classList.remove("disabled"),cartProducts.classList.add("disabled"),cartActions.classList.add("disabled"),cartBought.classList.add("disabled")),updateDeleteProduct(),updateReduceProduct(),updateTotal()}function updateDeleteProduct(){(cartProductDelete=document.querySelectorAll(".cart-product-delete")).forEach(t=>{t.addEventListener("click",deleteToCart)})}function deleteToCart(t){Toastify({text:"Removed product",duration:3e3,close:!0,gravity:"top",position:"right",stopOnFocus:!0,style:{background:"#f60",borderRadius:"2rem"},offset:{x:"2rem",y:"1.5rem"},onClick:function(){}}).showToast();let r=t.currentTarget.id,e=productsInCart.findIndex(t=>t.id===r);productsInCart.splice(e,1),loadCartProducts(),localStorage.setItem("products-in-cart",JSON.stringify(productsInCart))}function updateReduceProduct(){(cartProductReduce=document.querySelectorAll(".cart-product-reduce")).forEach(t=>{t.addEventListener("click",reduceProduct)})}function reduceProduct(t){let r=t.currentTarget.id,e=productsInCart.findIndex(t=>t.id===r);productsInCart.some(t=>t.id===r)&&(productsInCart[e].quantity--,0==productsInCart[e].quantity&&deleteToCart(t)),loadCartProducts(),localStorage.setItem("products-in-cart",JSON.stringify(productsInCart))}function emptyAllCart(){Swal.fire({title:"Are you sure?",icon:"question",background:"#fff",color:"#f60",html:`${productsInCart.reduce((t,r)=>t+r.quantity,0)} products will be deleted`,showCancelButton:!0,confirmButtonColor:"#f60",cancelButtonColor:"#f60",focusConfirm:!1,confirmButtonText:"Yes",cancelButtonText:"No"}).then(t=>{t.isConfirmed&&(productsInCart.length=0,localStorage.setItem("products-in-cart",JSON.stringify(productsInCart)),loadCartProducts())})}function updateTotal(){let t=productsInCart.reduce((t,r)=>t+r.price*r.quantity,0);total.innerText=`$${t}`}function buyCart(){productsInCart.length=0,localStorage.setItem("products-in-cart",JSON.stringify(productsInCart)),emptyCart.classList.add("disabled"),cartProducts.classList.add("disabled"),cartActions.classList.add("disabled"),cartBought.classList.remove("disabled")}loadCartProducts(),cartActionsEmpty.addEventListener("click",emptyAllCart),cartActionsBuy.addEventListener("click",buyCart);