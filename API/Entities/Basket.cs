using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id {get;set;}

        public string BuyerId {get; set;}

        public List<BasketItem> Items {get; set;} = new();  //will create a new list 'Items' when we create new basket.
        // tyoe of the list is determined by BasketItem.

        // a method to add product to basket if it doens't exist in basket. If it does, quantity will increase.
        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.ProductId != product.Id)) //if product not in list, add to list. Else increase quantity 
            {
                Items.Add(new BasketItem{Product = product, Quantity = quantity});

            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity; // sames as = existingItem.Quantity +quantity
        }

        public void RemoveItem(int ProductId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == ProductId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item); 
        }
    }
}