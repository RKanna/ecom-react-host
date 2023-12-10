const productsTest = [
  {
    itemId: "1",
    name: "OnePlus Nord Buds 2r",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/51oMWaW7tKL._SL1500_.jpg",
    description:
      "For the OnePlus Nord Buds 2r, you get to choose how heavy or light you want your sound with the help of sound master equalizer’s 3 unique audio profiles -Bold, Bass & Balanced",
    brand: "OnePlus",
    category: "Electronics",
    price: "2199",
    countInStock: "5",
    rating: "4.5",
    totalReviews: "5",
    sliderValue: false,
    discount: "10%",
  },
  {
    itemId: "2",
    name: "MI Power Bank 20000mAh",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71lVwl3q-kL._SL1500_.jpg",
    description:
      "The high capacity 20000mAh power bank allows you to simultaneously charge three devices at one go and does it way faster with the 18W fast charge support. The all new powerful 3i power bank supports re-charging via the type-c port or the micro-usb.",
    brand: "MI",
    category: "Electronics",
    price: "2148",
    countInStock: "7",
    rating: "4.7",
    totalReviews: "3",
    sliderValue: false,
    discount: "20%",
  },
  {
    itemId: "3",
    name: "Juârez Acoustic Guitar",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71IcDk5rU1L._SL1500_.jpg",
    description:
      "Features a sturdy top with smooth curves, promoting comfort during playing. This solid wood produces a smooth and rich sound ideal for rock, folk, country, and every genre in between. It also features a cutaway for easy holding and handling while playing the guitar.",
    brand: "JUAREZ",
    category: "Instruments",
    price: "1999",
    countInStock: "3",
    rating: "4.8",
    totalReviews: "10",
    sliderValue: false,
    discount: "7%",
  },

  {
    itemId: "5",
    name: "Atlantis Running Shoes",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61JunDar+SL._SL1500_.jpg",
    description:
      "Experience utmost comfort with these running shoes for men, featuring a breathable mesh upper for optimal air circulation and comfortable feet. Their versatile design effortlessly complements formal and casual outfits, making them ideal for work or college. Embrace their support during outdoor activities such as running, jogging, brisk walking, or yoga. Crafted from lightweight materials, these shoes ensure all-day ease, perfect for active individuals.",
    brand: "Campus",
    category: "Clothing & Accessories",
    price: "1400",
    countInStock: "3",
    rating: "4.9",
    totalReviews: "3",
    sliderValue: false,
    discount: "30%",
  },

  {
    itemId: "7",
    name: "Car Phone Holder",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71qaSnnWCWL._SL1500_.jpg",
    description:
      "Amkette iGrip Drive Telescopic Car Phone Holder is crafted to be the Ultimate No Compromise Car Mount providing Maximum Stability; Premium Construction; a Large number of Mounting Options and the iGrip Drive Assist Android App",
    brand: "Amkette",
    category: "Car & Accessories",
    price: "698",
    countInStock: 0,
    rating: "3.5",
    totalReviews: "3",
    sliderValue: false,
    discount: "50%",
  },
  {
    itemId: "8",
    name: "Oppo Enco Air3",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61a2y1FCAJL._SL1500_.jpg",
    description:
      "Smart Bluetooth Connectivity : BT 5.3 ensures more stable and interference-free connectivity .The earbuds can be paired with two devices at the same time, saving you the hassle of having to disconnect Bluetooth from one device and reconnect to another one.",
    brand: "Oppo",
    category: "Electronics",
    price: "4999",
    countInStock: "2",
    rating: "3.9",
    totalReviews: "7",
    sliderValue: false,
    discount: "9%",
  },
  {
    itemId: "4",
    name: "Crew Neck Sweatshirt",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71nkap6IJ2L._SL1500_.jpg",
    description:
      "Give a smart finish to your winter ensemble in these Black Solid Jacket from Allen Solly by Allen Solly.",
    brand: "Allen Solly",
    category: "Clothing & Accessories",
    price: "700",
    countInStock: "3",
    rating: "4.3",
    totalReviews: "5",
    sliderValue: false,
    discount: "70%",
  },
  {
    itemId: "6",
    name: "Pratham Fancy Saree",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71Fzdie8r4L._SL1500_.jpg",
    description:
      "Saree Color- Beige, Saree Material- Georgette, Saree Length- 6.3 m, Saree Print- Sequin work, Saree Work Type- Sequins Embroidery Work Blouse Color- Beige, Blouse Material-Satin Silk, Blouse Length- 0.9 m, Work Type- Sequins Embroidery",
    brand: "Pratham",
    category: "Clothing & Accessories",
    price: "1899",
    countInStock: "7",
    rating: "4.7",
    totalReviews: "3",
    sliderValue: false,
    discount: "45%",
  },
  {
    itemId: "9",
    name: "ASUS Vivobook 15",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71c0GSxtEEL._SL1500_.jpg",
    description:
      "Stamp your style on the world with ASUS Vivobook 15, the feature-packed laptop that makes it easy to get things done, anywhere. Everything about Vivobook 15 is bold and improved, from its powerful 12th Gen Intel Core processor to its crisp and clear display, 180° lay-flat hinge, modern colors and sleek geometric design. Make a fresh start today with Vivobook 15!",
    brand: "Asus",
    category: "Electronics",
    price: "65990",
    countInStock: "7",
    rating: "4.7",
    totalReviews: "20",
    sliderValue: true,
    discount: "3%",
  },
  {
    itemId: "10",
    name: "Apple 2023 iMac",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71YBcSl021L._SL1500_.jpg",
    description:
      "Get more done faster with a next-generation chip from Apple. From creating presentations to gaming, you’ll fly through work and play.You can do amazing things when you use your Apple devices together. Copy something on iPhone and paste it on iMac. Use your iMac to answer FaceTime calls or send texts with Messages. And that’s just the beginning.",
    brand: "Apple",
    category: "Electronics",
    price: "174990",
    countInStock: "2",
    rating: "5",
    totalReviews: "6",
    sliderValue: true,
    discount: "2%",
  },
  {
    itemId: "11",
    name: "NVIDIA GeForce RTX™ 4070 Ti",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71RFRgMnrLL._SL1500_.jpg",
    description:
      "Powered by NVIDIA DLSS3, ultra-efficient Ada Lovelace arch, and full ray tracing. 4th Generation Tensor Cores: Up to 4x performance with DLSS 3 vs. brute-force rendering. OC mode: 2760 MHz (OC mode)/ 2730 MHz (Default mode)",
    brand: "Asus",
    category: "Electronics",
    price: "104506",
    countInStock: "8",
    rating: "4.9",
    totalReviews: "12",
    sliderValue: true,
    discount: "12%",
  },
  {
    itemId: "12",
    name: "Creality CR-M4 3D Printer",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61eAcLWELxL._SL1000_.jpg",
    description:
      "CR-M4 boasts a massive build volume of 450*450*470mm. It's a real workhorse to create big models with less or no post-processing or to batch-print more parts in one go. Quasi-industrial Grade Large Format Precise and Reliable Dual Y-axis Linear Rails Start a Print Farm with More Printers Always a Handy Way of Printing Raise the Bar of Printhead Specs Diverse Filaments to Realize Bold Ideas Genuine 25-point Auto-Leveling Flexible PC Surface and Fast-heating Bed Less Wobbling with Rigid Z-axis",
    brand: "Creality",
    category: "Electronics",
    price: "100989",
    countInStock: "3",
    rating: "3.8",
    totalReviews: "4",
    sliderValue: false,
    discount: "6%",
  },
  {
    itemId: "13",
    name: "Slim Fit Cotton T-Shirt",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61bDoqhvEPL._SL1500_.jpg",
    description:
      "Look your stylish best in this trendy new design of men's white grey printed full sleeve round neck t-shirt from the latest collection of Urbano Fashion. The youthful & fashionable all-over printed design, high-quality & soft 100% cotton fabric, custom fit make it a must have for your wardrobe.",
    brand: "Urbano",
    category: "Clothing & Accessories",
    price: "599",
    countInStock: "20",
    rating: "2.5",
    totalReviews: "30",
    sliderValue: false,
    discount: "27%",
  },
  {
    itemId: "14",
    name: "Women's leatherette Tote Bag",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71vsHhPYgnL._SL1400_.jpg",
    description:
      "This beautiful tote is made with our signature floral printed leather like material that is so fresh and easy on the eyes. The chrome/silver trims add a touch of elegance to the bag and comes with a detachable sling strap that makes it comfortable to carry as a shoulder bag. The interior is very spacious and has pockets for your wallet, keys, phone, sanitizer, etc. This stylish handbag can easily be paired with all your comfortable summer outfits, giving them a touch of freshness. These branded Lino Perros bags are a must-have for all the ladies/girls.",
    brand: "Lino Perros",
    category: "Clothing & Accessories",
    price: "1209",
    countInStock: "5",
    rating: "5",
    totalReviews: "3",
    sliderValue: false,
    discount: "13%",
  },
  {
    itemId: "15",
    name: "Irusu Monster VR Headset",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61-tgcn-R3L._SL1500_.jpg",
    description:
      "Fully Adjustable lenses: Now you can adjust pupil distance and objects distance for individual lenses of the VR Headset. Suitable for different eye sights for comfortable and immersive VR experience.40MM HD Lenses : 40mm diameter HD optical lenses for immersive VR experience. In Built Touch button : used for triggering the actions in VR Gaming and Videos like play/pause,next/previous and for multiple selections in VR apps.",
    brand: "Irusu",
    category: "Electronics",
    price: "1899",
    countInStock: "9",
    rating: "4",
    totalReviews: "3",
    sliderValue: false,
    discount: "8%",
  },
  {
    itemId: "16",
    name: "Samsung Galaxy S23 Ultra",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61VfQJgn2BL._SL1500_.jpg",
    description:
      "Note's signature tool comes built in - The built-in S Pen keeps the legacy of Note alive. Plus, it helps you ditch the dependency on notebooks, making sketches and jotting notes effortless and eco-friendly. More innovation, less footprint – Galaxy S23 Ultra's striking symmetrical design returns with one major difference: recycled and eco-conscious materials. From the metal frame to the glass finish, it's polished with fresh new colors inspired by nature.",
    brand: "Samsung",
    category: "Electronics",
    price: "158998",
    countInStock: "2",
    rating: "4.7",
    totalReviews: "3",
    sliderValue: false,
    discount: "5%",
  },
  {
    itemId: "17",
    name: "Legion Tower Gaming Desktop",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71odkdfWj0L._AC_SL1500_.jpg",
    description:
      "Graphics: NVIDIA GeForce RTX 3070 8GB GDDR6 Graphics || Memory and Storage: 16GB DDR4-3200 RAM, expandable up to 128GB | Storage: 512GB SSD + 2TB HDD, Design: Blue LED logo illuminates the Raven Black casing | Transparent side panels | Internal ARGB Lighting | Airy 26L Interior, Cooling : 650W Power Supply | 2x Front with ARGB + 1x Rear with ARGB | Optimize gameplay with 3 performance modes (Balance, Quiet , Performance)",
    brand: "Lenovo",
    category: "Electronics",
    price: "104990",
    countInStock: "12",
    rating: "2.7",
    totalReviews: "9",
    sliderValue: false,
    discount: "28%",
  },
  {
    itemId: "18",
    name: "Inverter Split AC",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/51sTXvsanQL._SL1500_.jpg",
    description:
      "Split AC with Flexicool inverter Technology : Variable speed compressor which adjusts power depending on heat load | with Flexicool Convertible 4-in-1 inverter technology where user can increase or decrease cooling capacity and saves upto 50%* energy consumption. Capacity: 1.5 Ton. Suitable for Mid sized rooms (111 sq ft to 150 sq. ft); 450 CFM Air Flow & Ambient Temprature: 52 degree Celsius with 2 way Air Directional Control; Best in Class Cooling Capacity with 4800 watts",
    brand: "Carrier",
    category: "Electronics",
    price: "36990",
    countInStock: "5",
    rating: "4.5",
    totalReviews: "4",
    sliderValue: false,
    discount: "16%",
  },
  {
    itemId: "19",
    name: "Vu 4K Smart LED TV",
    image:
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71ep8pVlgyL._SL1500_.jpg",
    description:
      "The Vu GloLED TV features an integrated DJ class subwoofer. It is a specially engineered Sub-woofer that fits into the slim frame of The Vu GloLED TV yet does not crackle or vibrate even if the volume is at 100%. This Subwoofer enhances bass frequencies as well as provides a surround sound effect. The Vu GloLED TV panel is paired with the Vu Glo AI processor which upscales OTT content using advanced AI and reproduces the full-colour gamut. The Vu Glo AI processor has the latest quad-core processor as well as a dual-core GPU to run apps without any lag. The Vu GloLED TVcomes with 2GB RAM and 16GB storage.",
    brand: "Vu",
    category: "Electronics",
    price: "39990",
    countInStock: "3",
    rating: "4.9",
    totalReviews: "4",
    sliderValue: false,
    discount: "5%",
  },
];

export default productsTest;
