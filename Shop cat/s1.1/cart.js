// Function to handle adding items to the cart
function addToCart(productName, price) {
    // Example cart object - you can replace this with a more sophisticated cart system
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Add the product to the cart
    cart.push({ productName, price });
    
    // Save the updated cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Notify the user with a Thai message
    alert(`${productName} ได้ถูกเพิ่มเข้าไปในตะกร้าของคุณแล้ว.`);
  }
  
  // Add event listeners to each "Add to Cart" button
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', () => {
        const productName = "Nina-Ottosson Cat - Buggin' Out";  // Replace with dynamic product name
        const price = "$30.50";  // Replace with dynamic price
        addToCart(productName, price);
      });
    });
  
    document.querySelectorAll('.add-to-cart-16').forEach((button) => {
      button.addEventListener('click', () => {
        const productName = "KAFBO - Praphume Cat Nail Scraper and House";
        const price = "$38.50";
        addToCart(productName, price);
      });
    });
  
    document.querySelectorAll('.add-to-cart-1a').forEach((button) => {
      button.addEventListener('click', () => {
        const productName = "Nina-Ottosson Cat Interactive Toy - Melon Madness";
        const price = "$32.50";
        addToCart(productName, price);
      });
    });
  
    document.querySelectorAll('.add-to-cart-24').forEach((button) => {
      button.addEventListener('click', () => {
        const productName = "Nina-Ottosson Cat Interactive Toy - Rainy Day";
        const price = "$36.50";
        addToCart(productName, price);
      });
    });
  });

  