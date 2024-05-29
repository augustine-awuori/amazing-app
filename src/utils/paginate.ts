import _ from "lodash";
import { Product } from "../hooks/useProducts";
import empty from "./empty";

export function paginate<T>(items: T[], pageNumber: number, pageSize: number) {
  const startIndex = (pageNumber - 1) * pageSize;

  return _(items).slice(startIndex).take(pageSize).value() as T[];
}
export const products: Product[] = [
  {
    _id: "66389635376ab68953b4843e",
    author: {
      _id: "663875ce65a46beeedf99b3a",
      username: "matthan1",
      name: "Matthan",
      isAdmin: false,
      isVerified: false,
      timestamp: 1714976206000,
      otherAccounts: { whatsapp: "+254752462627" },

      chatIds: {
        "matthanmmabumba@gmail.com": "RhmFoIKmi7OKGhV6aqfVeim2L0c2",
      },
    },
    description: "Available in the shown colours",
    shop: {
      _id: "663877c965a46beeedf99c29",
      author: "663875ce65a46beeedf99b3a",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/daca2a93-1957-4071-858e-ceb5fa61d853?alt=media&token=9cbb498a-a916-4c80-899e-a0b4a9aeb51e",
      name: "Ma tony's home decor",
      location: "Nakuru town opposite Mku",
      types: { "6512c29f2a86951f79cd7285": "6512c29f2a86951f79cd7285" },
      isVerified: false,
      views: 1,
      timestamp: 1714976713000,
    },
    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/1152ded6-e8a1-4465-b0b1-ebf8ff211056?alt=media&token=b2b920f2-ed36-46e4-8e28-6db65dcac7c5",
    ],
    type: { _id: "6512c29f2a86951f79cd7285", label: "Other Stores" },
    price: 350,
    name: "Pillow",
    timestamp: 1714984501000,
  },
  {
    _id: "662e49ac3829d69354cd8aae",
    author: {
      _id: "6628d7574bc1f16df6037355",
      username: "mwascreativearts",
      name: "mwas creative arts",
      isAdmin: false,
      isVerified: false,
      timestamp: 1713952599000,
      otherAccounts: { whatsapp: "+254757865747" },
    },
    description: "A1",
    shop: {
      _id: "6628d89c4bc1f16df60373b6",
      author: "6628d7574bc1f16df6037355",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/40864664-bd3f-4ec4-a9f8-904463471037?alt=media&token=2ca86a9c-17ea-4b1c-bc24-f44e2541d0a7",
      name: "Mwas creative arts",
      location: "Nakuru town",
      types: { "650ae16536b440a7697c61c5": "650ae16536b440a7697c61c5" },
      isVerified: false,
      views: 2,
      timestamp: 1713952924000,
    },
    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/f5a9678d-f77f-4906-9198-82fc77d2d6b7?alt=media&token=583a6f55-8e05-4e61-915b-7125c5ddfdfc",
    ],
    type: { _id: "650ae16536b440a7697c61c5", label: "Furniture Store" },
    price: 1200,
    name: "Mwas creative arts",
    timestamp: 1714309548000,
  },
  {
    _id: "662e48873829d69354cd895b",
    author: {
      _id: "6628d7574bc1f16df6037355",
      username: "mwascreativearts",
      name: "mwas creative arts",
      isAdmin: false,
      isVerified: false,
      timestamp: 1713952599000,
      otherAccounts: { whatsapp: "+254757865747" },
    },
    description: "",
    shop: {
      _id: "6628d89c4bc1f16df60373b6",
      author: "6628d7574bc1f16df6037355",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/40864664-bd3f-4ec4-a9f8-904463471037?alt=media&token=2ca86a9c-17ea-4b1c-bc24-f44e2541d0a7",
      name: "Mwas creative arts",
      location: "Nakuru town",
      types: { "650ae16536b440a7697c61c5": "650ae16536b440a7697c61c5" },
      isVerified: false,
      views: 2,
      timestamp: 1713952924000,
    },
    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/1996c5a4-c4d4-41c8-940b-77197d793c32?alt=media&token=8b65242e-7b4d-438b-9c25-09c781a96e53",
    ],
    type: { _id: "650ae16536b440a7697c61c5", label: "Furniture Store" },
    price: 1200,
    name: "Mwas creative arts",
    timestamp: 1714309255000,
  },
  {
    _id: "662e474c3829d69354cd873e",
    author: {
      _id: "6628d7574bc1f16df6037355",
      username: "mwascreativearts",
      name: "mwas creative arts",
      isAdmin: false,
      isVerified: false,
      timestamp: 1713952599000,
      otherAccounts: { whatsapp: "+254757865747" },
    },
    description: "A1",
    shop: {
      _id: "6628d89c4bc1f16df60373b6",
      author: "6628d7574bc1f16df6037355",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/40864664-bd3f-4ec4-a9f8-904463471037?alt=media&token=2ca86a9c-17ea-4b1c-bc24-f44e2541d0a7",
      name: "Mwas creative arts",
      location: "Nakuru town",
      types: { "650ae16536b440a7697c61c5": "650ae16536b440a7697c61c5" },
      isVerified: false,
      views: 2,
      timestamp: 1713952924000,
    },
    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/f80ab790-d18a-4360-954c-1cf14a481c72?alt=media&token=d4acd5b5-e140-4e0d-906d-82bf8b15a2e5",
    ],
    type: { _id: "650ae16536b440a7697c61c5", label: "Furniture Store" },
    price: 1200,
    name: "mwas creative arts",
    timestamp: 1714308940000,
  },
  {
    _id: "662d00765666ce07283fbad8",
    author: {
      _id: "6628e0c84bc1f16df6037a25",
      username: "rocafella1",
      name: "Rocafella",
      isAdmin: false,
      isVerified: false,
      timestamp: 1713955016000,
      otherAccounts: { whatsapp: "+254762928815" },
    },
    description:
      "get these good looking shoes to match your goodlooking outfit",
    shop: {
      _id: "6628e2044bc1f16df6037c67",
      author: "6628e0c84bc1f16df6037a25",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/956313f4-7d75-4b09-b136-8763add08e27?alt=media&token=0ad00c29-4469-4152-b262-6c8c18502f3b",
      name: "Rockefeller shoes",
      location: "Nakuru along tidies hotel oginga odinga road",
      types: { "650ae12136b440a7697c61bf": "650ae12136b440a7697c61bf" },
      isVerified: false,
      views: 4,
      timestamp: 1713955332000,
    },
    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/d13489a0-0d5a-4ee9-9693-531f77f9cdb9?alt=media&token=b5878c00-4970-4383-a51a-8f1c10e23535",
    ],
    type: { _id: "650ae12136b440a7697c61bf", label: "Shoe Store" },
    price: 4000,
    name: "Offwhite",
    timestamp: 1714225270000,
  },
  {
    _id: "662cfeb65666ce07283fb9cb",
    author: {
      _id: "6628e0c84bc1f16df6037a25",
      username: "rocafella1",
      name: "Rocafella",
      isAdmin: false,
      isVerified: false,
      timestamp: 1713955016000,
      otherAccounts: { whatsapp: "+254762928815" },
    },
    description: "available in black red and maroon",
    shop: {
      _id: "6628e2044bc1f16df6037c67",
      author: "6628e0c84bc1f16df6037a25",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/956313f4-7d75-4b09-b136-8763add08e27?alt=media&token=0ad00c29-4469-4152-b262-6c8c18502f3b",
      name: "Rockefeller shoes",
      location: "Nakuru along tidies hotel oginga odinga road",
      types: { "650ae12136b440a7697c61bf": "650ae12136b440a7697c61bf" },
      isVerified: false,
      views: 4,
      timestamp: 1713955332000,
    },
    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/48a6c656-a5dc-4569-9afc-6d8a1ed8dcc8?alt=media&token=363f75c9-0e44-4cfc-a9bc-90799961ef2c",
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/acc8130d-816d-4799-84c5-98ba67e7b231?alt=media&token=ebe5afd2-4f5e-43f8-9d9a-2ff69c184b0e",
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/795ad891-d03c-4427-bb1d-ccdbe18caa6e?alt=media&token=7d3f129f-870e-4a40-902c-84ba2960e7b5",
    ],
    type: { _id: "650ae12136b440a7697c61bf", label: "Shoe Store" },
    price: 2000,
    name: "Vans",
    timestamp: 1714224822000,
  },
  {
    _id: "662a4b49e780d16d8aba1e5b",
    author: {
      _id: "6628d7574bc1f16df6037355",
      username: "mwascreativearts",
      name: "mwas creative arts",
      isAdmin: false,
      isVerified: false,
      timestamp: 1713952599000,
      otherAccounts: { whatsapp: "+254757865747" },
    },
    description: "lampshades",
    shop: {
      _id: "6628d89c4bc1f16df60373b6",
      author: "6628d7574bc1f16df6037355",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/40864664-bd3f-4ec4-a9f8-904463471037?alt=media&token=2ca86a9c-17ea-4b1c-bc24-f44e2541d0a7",
      name: "Mwas creative arts",
      location: "Nakuru town",
      types: { "650ae16536b440a7697c61c5": "650ae16536b440a7697c61c5" },
      isVerified: false,
      views: 2,
      timestamp: 1713952924000,
    },
    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/f7e8732e-74f8-4d85-aaab-cf76928f81de?alt=media&token=1beafbf4-41f5-4c47-b2f7-5a41d7f38dfd",
    ],
    type: { _id: "650ae16536b440a7697c61c5", label: "Furniture Store" },
    price: 800,
    name: "Mwas creative arts",
    timestamp: 1714047817000,
  },
  {
    _id: "662a4aa5e780d16d8aba1d29",
    author: {
      _id: "6628d7574bc1f16df6037355",
      username: "mwascreativearts",
      name: "mwas creative arts",
      isAdmin: false,
      isVerified: false,
      timestamp: 1713952599000,
      otherAccounts: { whatsapp: "+254757865747" },
    },
    description:
      "wall clock hanging of any type,17-23inches, durable string clock",
    shop: {
      _id: "6628d89c4bc1f16df60373b6",
      author: "6628d7574bc1f16df6037355",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/40864664-bd3f-4ec4-a9f8-904463471037?alt=media&token=2ca86a9c-17ea-4b1c-bc24-f44e2541d0a7",
      name: "Mwas creative arts",
      location: "Nakuru town",
      types: { "650ae16536b440a7697c61c5": "650ae16536b440a7697c61c5" },
      isVerified: false,
      views: 2,
      timestamp: 1713952924000,
    },
    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/05eac4c4-282e-460c-a23b-8818a34a09fc?alt=media&token=bee345b1-4754-4739-8da9-4a572deb785e",
    ],
    type: { _id: "650ae16536b440a7697c61c5", label: "Furniture Store" },
    price: 2000,
    name: "Mwas creative arts",
    timestamp: 1714047653000,
  },
  {
    _id: "6629790d34ae39e4fd405dd7",
    author: {
      _id: "6628d7574bc1f16df6037355",
      username: "mwascreativearts",
      name: "mwas creative arts",
      isAdmin: false,
      isVerified: false,
      timestamp: 1713952599000,
      otherAccounts: { whatsapp: "+254757865747" },
    },
    description: "wall hanging 17-23 inches",
    shop: {
      _id: "6628d89c4bc1f16df60373b6",
      author: "6628d7574bc1f16df6037355",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/40864664-bd3f-4ec4-a9f8-904463471037?alt=media&token=2ca86a9c-17ea-4b1c-bc24-f44e2541d0a7",
      name: "Mwas creative arts",
      location: "Nakuru town",
      types: { "650ae16536b440a7697c61c5": "650ae16536b440a7697c61c5" },
      isVerified: false,
      views: 2,
      timestamp: 1713952924000,
    },
    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/038d0710-5b99-4b12-893a-4c271c539ced?alt=media&token=2673dc7e-1db6-433e-ba6d-45d8900363ba",
    ],
    type: { _id: "650ae16536b440a7697c61c5", label: "Furniture Store" },
    price: 1500,
    name: "fine art",
    timestamp: 1713993997000,
  },
  {
    _id: "6628e30c4bc1f16df6037d2b",
    author: {
      _id: "6628e0c84bc1f16df6037a25",
      username: "rocafella1",
      name: "Rocafella",
      isAdmin: false,
      isVerified: false,
      timestamp: 1713955016000,
      otherAccounts: { whatsapp: "+254762928815" },
    },
    description: "authentic quality all sizes 40-45",
    shop: {
      _id: "6628e2044bc1f16df6037c67",
      author: "6628e0c84bc1f16df6037a25",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/956313f4-7d75-4b09-b136-8763add08e27?alt=media&token=0ad00c29-4469-4152-b262-6c8c18502f3b",
      name: "Rockefeller shoes",
      location: "Nakuru along tidies hotel oginga odinga road",
      types: { "650ae12136b440a7697c61bf": "650ae12136b440a7697c61bf" },
      isVerified: false,
      views: 4,
      timestamp: 1713955332000,
    },
    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/3687579f-c72a-4782-97ea-a14cb001c9b0?alt=media&token=efcb3f6d-9db7-437a-a637-a1878c12d6cf",
    ],
    type: { _id: "650ae12136b440a7697c61bf", label: "Shoe Store" },
    price: 4500,
    name: "Jordan's",
    timestamp: 1713955596000,
  },
  {
    _id: "661f8b86ddc0a4c8bdd0b9e4",
    author: {
      _id: "656d813089e8550b9f478f2f",
      username: "@-mabumbar",
      name: "Matthan",
      isAdmin: true,
      hasShop: false,
      isVerified: true,
      timestamp: 1701675312000,
      otherAccounts: { whatsapp: "+254752462627" },

      chatIds: {
        "mathanmabumba@gmail.com": "iuUKZZlrvdY6VIdf0WCUDFXEKLl2",
      },
    },
    description:
      "Good leather and its mechanical lasts for long doesn't need battery",
    shop: {
      _id: "661f7efdddc0a4c8bdd0ad11",
      author: "656d813089e8550b9f478f2f",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/eb795b69-7781-4b7a-b3e7-aa716866203e?alt=media&token=8765a29a-56db-4fbc-b3c9-8509aee65647",
      name: "Auth3ntiks",
      location: "Around kisii town delivery done country wide",
      types: { "650ae0c736b440a7697c61bb": "650ae0c736b440a7697c61bb" },
      isVerified: false,
      views: 24,
      timestamp: 1713340157000,
    },
    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/0e777f8c-f792-4bcb-b567-8e1ff4b41543?alt=media&token=5a30d0d6-3b97-4bb5-98fb-209516a46a37",
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/34bf582c-6973-4a00-934f-ea9a83b223a6?alt=media&token=faaf7981-9564-4b3b-a965-0c87ba834ea0",
    ],
    type: {
      _id: "650ae0c736b440a7697c61bb",
      label: "Electronics Store",
    },
    price: 4500,
    name: "Hublot watch",
    timestamp: 1713343366000,
  },
  {
    _id: "661a71562951c65539b03c37",
    author: {
      _id: "64ce3ea3aa3eeebe8ba9a823",
      username: "@kisiiuniversemart",
      name: "Campus Mart",
      isAdmin: true,
      isVerified: true,
      timestamp: 1691238051000,
      otherAccounts: { whatsapp: "254796720289" },

      aboutMe:
        "Our mission is to empower users with a seamless and innovative digital experience that simplifies their daily tasks and enhances their lives. Join us in our mission to create a more connected and efficient world through technology. Let's explore together and make the most of what our app has to offer.",
      avatar: "icon.png",
      pushTokens: {
        "dpXEAO5PsujuUxqINbTvtE:APA91bEDOTSpOTlr71ZOyil7s_cAVADx6Fm8Qbc52MzedSIf0FDPEsxFNN4zANNcIrNW0p06iGNx3dYUhYZ-xVEf6xGNTGke1O7kGeySBmd3uJUu79rQX4m-W8X77OttxdosxVY_MNWF":
          "dpXEAO5PsujuUxqINbTvtE:APA91bEDOTSpOTlr71ZOyil7s_cAVADx6Fm8Qbc52MzedSIf0FDPEsxFNN4zANNcIrNW0p06iGNx3dYUhYZ-xVEf6xGNTGke1O7kGeySBmd3uJUu79rQX4m-W8X77OttxdosxVY_MNWF",
      },
    },
    description: "With AI embedded",
    shop: {
      _id: "66161fec4aa460194006e689",
      author: "64ce3ea3aa3eeebe8ba9a823",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/17b10dee-05cf-4b00-bb85-eb5b688a533c?alt=media&token=ff6f2892-0b61-415a-9daf-17f1874417d3",
      name: "New Shop ACD",
      location: "Main CBD",
      types: {
        "650ae0c736b440a7697c61bb": "650ae0c736b440a7697c61bb",
        "650ae10736b440a7697c61bd": "650ae10736b440a7697c61bd",
        "650ae14336b440a7697c61c1": "650ae14336b440a7697c61c1",
        "650ae12136b440a7697c61bf": "650ae12136b440a7697c61bf",
        "650ae15536b440a7697c61c3": "650ae15536b440a7697c61c3",
      },
      isVerified: false,
      views: 10,
      timestamp: 1712725996000,
    },
    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/2651051e-274a-4888-8f69-871c35c804d1?alt=media&token=858e234b-7ba6-477d-bb8b-131bd3a7ab0e",
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/a5d8728c-0460-404b-a17c-1809bc60fa9c?alt=media&token=7c49f6d6-9bca-4786-acef-ebec966e3909",
    ],
    type: {
      _id: "650ae0c736b440a7697c61bb",
      label: "Electronics Store",
    },
    price: 35000,
    name: "Fridge",
    timestamp: 1713008982000,
  },
  {
    _id: "66193bf255c82a4acff89ef4",
    author: {
      _id: "64ce3ea3aa3eeebe8ba9a823",
      username: "@kisiiuniversemart",
      name: "Campus Mart",
      isAdmin: true,
      isVerified: true,
      timestamp: 1691238051000,
      otherAccounts: { whatsapp: "254796720289" },
      chatIds: {},
      email: "",
      hasShop: false,
      aboutMe:
        "Our mission is to empower users with a seamless and innovative digital experience that simplifies their daily tasks and enhances their lives. Join us in our mission to create a more connected and efficient world through technology. Let's explore together and make the most of what our app has to offer.",
      avatar: "icon.png",
      pushTokens: {
        "dpXEAO5PsujuUxqINbTvtE:APA91bEDOTSpOTlr71ZOyil7s_cAVADx6Fm8Qbc52MzedSIf0FDPEsxFNN4zANNcIrNW0p06iGNx3dYUhYZ-xVEf6xGNTGke1O7kGeySBmd3uJUu79rQX4m-W8X77OttxdosxVY_MNWF":
          "dpXEAO5PsujuUxqINbTvtE:APA91bEDOTSpOTlr71ZOyil7s_cAVADx6Fm8Qbc52MzedSIf0FDPEsxFNN4zANNcIrNW0p06iGNx3dYUhYZ-xVEf6xGNTGke1O7kGeySBmd3uJUu79rQX4m-W8X77OttxdosxVY_MNWF",
      },
    },
    type: empty.type,
    description: "Power saver",
    shop: {
      _id: "66161fec4aa460194006e689",
      author: "64ce3ea3aa3eeebe8ba9a823",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/17b10dee-05cf-4b00-bb85-eb5b688a533c?alt=media&token=ff6f2892-0b61-415a-9daf-17f1874417d3",
      name: "New Shop ACD",
      location: "Main CBD",
      types: {
        "650ae0c736b440a7697c61bb": "650ae0c736b440a7697c61bb",
        "650ae10736b440a7697c61bd": "650ae10736b440a7697c61bd",
        "650ae14336b440a7697c61c1": "650ae14336b440a7697c61c1",
        "650ae12136b440a7697c61bf": "650ae12136b440a7697c61bf",
        "650ae15536b440a7697c61c3": "650ae15536b440a7697c61c3",
      },
      isVerified: false,
      views: 10,
      timestamp: 1712725996000,
    },
    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/e1622b87-5c72-484a-9113-cf7bf7d89899?alt=media&token=b8bddb9d-d3d5-4815-b234-87d7750d69b0",
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/e828cebe-2426-403b-9420-d4129fe55863?alt=media&token=cb8160e1-e45f-4e0c-a1b1-04feeefa47dc",
    ],
    price: 10500,
    name: "Microwave",
    timestamp: 1712929778000,
  },
  {
    _id: "65e044eba95ac3f947c5ccc4",
    author: {
      _id: "65e04486a95ac3f947c5cc66",
      username: "justusgisemba",
      name: "JUSTUS GISEMBA",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1709196422000,
      otherAccounts: { whatsapp: "+254700004679" },
    },
    description: "coffeee beries",
    shop: {
      _id: "65e044c9a95ac3f947c5ccaa",
      author: "65e04486a95ac3f947c5cc66",
      image:
        "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/b2a5b287-0da8-4735-9587-6a06ead0c9ac?alt=media&token=287f0469-8962-4b98-92c4-50b796703b03",
      name: "tim",
      location: "kisii",
      isVerified: false,
      views: 9,
      timestamp: 1709196489000,

      types: { "65e044c9a95ac3f947c5ccaa": "65e044c9a95ac3f947c5ccaa" },
    },
    price: 400,
    name: "coffee",
    timestamp: 1709196523000,

    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/084675d8-f836-4c89-8fd6-d260d97adc0b?alt=media&token=2976868f-b88a-4ba9-8d78-a6e730f90f6e",
    ],
    type: empty.type,
  },
  {
    _id: "65ce47674a6903192c2eab56",
    author: {
      _id: "65b04b97e383e42d4fb3c8d7",
      username: "@Laptops center",
      name: "Rico computer Solutions LTD",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1706052503000,
      otherAccounts: { whatsapp: "+254711415486" },
    },
    description: "Available.",
    shop: {
      isVerified: false,
      _id: "6526d0a45070abff891c13f1",
      author: "6526cfe25070abff891c13cf",
      image: "155009fd9da10e4fc644ae25d94d9425",
      name: "Rico digital computer solutions",
      timestamp: 1697042596000,

      views: 5,
      types: { "6526d0a45070abff891c13f1": "6526d0a45070abff891c13f1" },
    },

    price: 10500,
    name: "Complete desktop",
    timestamp: 1706052561000,

    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/41d062b8-b8f0-40bb-8271-89c727534fd7?alt=media&token=91656059-cb0f-4d54-b49b-fa59d49db980",
    ],
    type: empty.type,
  },
  {
    _id: "65cb667d6300c99a77c5316e",
    author: {
      _id: "6571b5f5ec90f199094ac068",
      username: "@Stanley",
      name: "Modo",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1701950965000,
      otherAccounts: { whatsapp: "+254114695349" },
    },
    description: "",
    shop: {
      _id: "65832952d715d979339e83f0",
      author: "6571b5f5ec90f199094ac068",
      image: "c4c7eab5f841f14be53b95a5fb70a58a",
      name: "Hlsea malimali shop",
      location: "Main stage kisii\r\nBusiness mall",
      isVerified: false,
      views: 13,
      timestamp: 1703094610000,

      types: { "65832952d715d979339e83f0": "65832952d715d979339e83f0" },
    },
    price: 250,
    name: "Couple Necklace",
    timestamp: 1707715296000,

    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/e9851f6d-bfb8-4eb0-ba8e-2e6e618c59f2?alt=media&token=8f01b7c3-9e6f-4f81-8f01-cf741e2dcad2",
    ],
    type: empty.type,
  },
  {
    _id: "65cb64c16300c99a77c53064",
    author: {
      _id: "6571b5f5ec90f199094ac068",
      username: "@Stanley",
      name: "Modo",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1701950965000,
      otherAccounts: { whatsapp: "+254114695349" },
    },
    description: "",
    shop: {
      _id: "65832952d715d979339e83f0",
      author: "6571b5f5ec90f199094ac068",
      image: "c4c7eab5f841f14be53b95a5fb70a58a",
      name: "Hlsea malimali shop",
      location: "Main stage kisii\r\nBusiness mall",
      isVerified: false,
      views: 13,
      timestamp: 1703094610000,

      types: { "65832952d715d979339e83f0": "65832952d715d979339e83f0" },
    },
    price: 1800,
    name: "Ailyons",
    timestamp: 1707715576000,

    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/761861c2-5a9f-4d2c-b8cf-17930d046441?alt=media&token=c5871702-26be-4f30-a936-1edfb637b62f",
    ],
    type: empty.type,
  },
  {
    _id: "65cb64216300c99a77c52f9b",
    author: {
      _id: "6571b5f5ec90f199094ac068",
      username: "@Stanley",
      name: "Modo",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1701950965000,
      otherAccounts: { whatsapp: "+254114695349" },
    },
    description: "",
    shop: {
      _id: "65832952d715d979339e83f0",
      author: "6571b5f5ec90f199094ac068",
      image: "c4c7eab5f841f14be53b95a5fb70a58a",
      name: "Hlsea malimali shop",
      location: "Main stage kisii\r\nBusiness mall",
      isVerified: false,
      views: 13,
      timestamp: 1703094610000,

      types: { "65832952d715d979339e83f0": "65832952d715d979339e83f0" },
    },
    price: 1500,
    name: "Headphones",
    timestamp: 1707715732000,

    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/e38da802-ab28-4bae-a18b-f130ee840a43?alt=media&token=69a10904-6806-4d6d-b47a-d32188224020",
    ],
    type: empty.type,
  },
  {
    _id: "65cb64146300c99a77c52f5f",
    author: {
      _id: "6571b5f5ec90f199094ac068",
      username: "@Stanley",
      name: "Modo",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1701950965000,
      otherAccounts: { whatsapp: "+254114695349" },
    },
    description: "",
    shop: {
      _id: "65832952d715d979339e83f0",
      author: "6571b5f5ec90f199094ac068",
      image: "c4c7eab5f841f14be53b95a5fb70a58a",
      name: "Hlsea malimali shop",
      location: "Main stage kisii\r\nBusiness mall",
      isVerified: false,
      views: 13,
      timestamp: 1703094610000,

      types: { "65832952d715d979339e83f0": "65832952d715d979339e83f0" },
    },
    price: 750,
    name: "Ipods",
    timestamp: 1707715849000,

    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/6db2ea2a-c354-424e-a1fb-f6662c07408c?alt=media&token=862d775a-022b-44ad-832e-6ed786722e03",
    ],
    type: empty.type,
  },
  {
    _id: "65cb63f56300c99a77c52f06",
    author: {
      _id: "6571b5f5ec90f199094ac068",
      username: "@Stanley",
      name: "Modo",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1701950965000,
      otherAccounts: { whatsapp: "+254114695349" },
    },
    description: "",
    shop: {
      _id: "65832952d715d979339e83f0",
      author: "6571b5f5ec90f199094ac068",
      image: "c4c7eab5f841f14be53b95a5fb70a58a",
      name: "Hlsea malimali shop",
      location: "Main stage kisii\r\nBusiness mall",
      isVerified: false,
      views: 13,
      timestamp: 1703094610000,

      types: { "65832952d715d979339e83f0": "65832952d715d979339e83f0" },
    },
    price: 350,
    name: "Capes",
    timestamp: 1707716367000,

    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/fa77e7a3-1836-4e4b-ba3f-f7ce1ba66c01?alt=media&token=d8a3f328-75ed-42cf-a31e-0d4a6a29f86a",
    ],
    type: empty.type,
  },
  {
    _id: "65cb63e46300c99a77c52eca",
    author: {
      _id: "6571b5f5ec90f199094ac068",
      username: "@Stanley",
      name: "Modo",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1701950965000,
      otherAccounts: { whatsapp: "+254114695349" },
    },
    description: "",
    shop: {
      _id: "65832952d715d979339e83f0",
      author: "6571b5f5ec90f199094ac068",
      image: "c4c7eab5f841f14be53b95a5fb70a58a",
      name: "Hlsea malimali shop",
      location: "Main stage kisii\r\nBusiness mall",
      isVerified: false,
      views: 13,
      timestamp: 1703094610000,

      types: { "65832952d715d979339e83f0": "65832952d715d979339e83f0" },
    },
    price: 1400,
    name: "C15",
    timestamp: 1707716650000,

    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/7eb4a24e-e59b-4d49-93c8-68af8dbf77e3?alt=media&token=4c3df16a-15ac-41e5-996f-65cde05d8252",
    ],
    type: empty.type,
  },
  {
    _id: "65cb63bd6300c99a77c52e5f",
    author: {
      _id: "6571b5f5ec90f199094ac068",
      username: "@Stanley",
      name: "Modo",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1701950965000,
      otherAccounts: { whatsapp: "+254114695349" },
    },
    description: "",
    shop: {
      _id: "65832952d715d979339e83f0",
      author: "6571b5f5ec90f199094ac068",
      image: "c4c7eab5f841f14be53b95a5fb70a58a",
      name: "Hlsea malimali shop",
      location: "Main stage kisii\r\nBusiness mall",
      isVerified: false,
      views: 13,
      timestamp: 1703094610000,

      types: { "65832952d715d979339e83f0": "65832952d715d979339e83f0" },
    },
    price: 6000,
    name: "Vitron 3.1",
    timestamp: 1707715936000,

    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/e73508d7-fe7e-470a-9211-223b65ebdc18?alt=media&token=0f076872-2ece-4a57-9fea-6acfd9595d82",
    ],
    type: empty.type,
  },
  {
    _id: "65cb638c6300c99a77c52dee",
    author: {
      _id: "6571b5f5ec90f199094ac068",
      username: "@Stanley",
      name: "Modo",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1701950965000,
      otherAccounts: { whatsapp: "+254114695349" },
    },
    description: "",
    shop: {
      _id: "65832952d715d979339e83f0",
      author: "6571b5f5ec90f199094ac068",
      image: "c4c7eab5f841f14be53b95a5fb70a58a",
      name: "Hlsea malimali shop",
      location: "Main stage kisii\r\nBusiness mall",
      isVerified: false,
      views: 13,
      timestamp: 1703094610000,

      types: { "65832952d715d979339e83f0": "65832952d715d979339e83f0" },
    },
    price: 550,
    name: "Watch",
    timestamp: 1707716006000,

    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/d120d0bd-13e1-4b60-a7da-d8c036004126?alt=media&token=8512de60-d523-4575-96d6-4bfc6566ab41",
    ],
    type: empty.type,
  },
  {
    _id: "65ca3ceb18fb871aee1bf206",
    author: {
      _id: "6571b5f5ec90f199094ac068",
      username: "@Stanley",
      name: "Modo",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1701950965000,
      otherAccounts: { whatsapp: "+254114695349" },
    },
    description: "",
    shop: {
      _id: "65832952d715d979339e83f0",
      author: "6571b5f5ec90f199094ac068",
      image: "c4c7eab5f841f14be53b95a5fb70a58a",
      name: "Hlsea malimali shop",
      location: "Main stage kisii\r\nBusiness mall",
      isVerified: false,
      views: 13,
      timestamp: 1703094610000,

      types: { "65832952d715d979339e83f0": "65832952d715d979339e83f0" },
    },
    price: 850,
    name: "Ipods",
    timestamp: 1707715506000,

    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/308adbac-d751-4162-8203-1f5fd18b5efa?alt=media&token=100887db-b2b9-4142-9465-46766f36c96f",
    ],
    type: empty.type,
  },
  {
    _id: "65ca3ccd18fb871aee1bf1e1",
    author: {
      _id: "6571b5f5ec90f199094ac068",
      username: "@Stanley",
      name: "Modo",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1701950965000,
      otherAccounts: { whatsapp: "+254114695349" },
    },
    description: "",
    shop: {
      _id: "65832952d715d979339e83f0",
      author: "6571b5f5ec90f199094ac068",
      image: "c4c7eab5f841f14be53b95a5fb70a58a",
      name: "Hlsea malimali shop",
      location: "Main stage kisii\r\nBusiness mall",
      isVerified: false,
      views: 13,
      timestamp: 1703094610000,

      types: { "65832952d715d979339e83f0": "65832952d715d979339e83f0" },
    },
    price: 550,
    name: "Earrings",
    timestamp: 1707715657000,

    images: [
      "https://firebasestorage.googleapis.com/v0/b/kisii-campus-mart-site.appspot.com/o/3c364af0-c8ef-4a8e-8283-f57f65ba5644?alt=media&token=b0d6f17f-5467-47fa-9135-9ba4e643886d",
    ],
    type: empty.type,
  },
  {
    images: [],
    _id: "65ca3cab18fb871aee1bf1c3",
    author: {
      _id: "6571b5f5ec90f199094ac068",
      username: "@Stanley",
      name: "Modo",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1701950965000,
      otherAccounts: { whatsapp: "+254114695349" },
    },
    description: "",
    shop: {
      _id: "65832952d715d979339e83f0",
      author: "6571b5f5ec90f199094ac068",
      image: "c4c7eab5f841f14be53b95a5fb70a58a",
      name: "Hlsea malimali shop",
      location: "Main stage kisii\r\nBusiness mall",
      isVerified: false,
      views: 13,
      timestamp: 1703094610000,
      types: { "65832952d715d979339e83f0": "65832952d715d979339e83f0" },
    },
    price: 4500,
    name: "Cooking plate",
    timestamp: 1707716083000,
    type: empty.type,
  },
  {
    images: [],
    _id: "65ca3c9c18fb871aee1bf1ab",
    author: {
      _id: "6571b5f5ec90f199094ac068",
      username: "@Stanley",
      name: "Modo",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1701950965000,
      otherAccounts: { whatsapp: "+254114695349" },
    },
    description: "",
    shop: {
      _id: "65832952d715d979339e83f0",
      author: "6571b5f5ec90f199094ac068",
      image: "c4c7eab5f841f14be53b95a5fb70a58a",
      name: "Hlsea malimali shop",
      location: "Main stage kisii\r\nBusiness mall",
      isVerified: false,
      views: 13,
      timestamp: 1703094610000,

      types: { "65832952d715d979339e83f0": "65832952d715d979339e83f0" },
    },
    price: 1200,
    name: "Mpesa board",
    timestamp: 1707716153000,
    type: empty.type,
  },
  {
    images: [],
    _id: "65ca3c5d18fb871aee1bf183",
    author: {
      _id: "6571b5f5ec90f199094ac068",
      username: "@Stanley",
      name: "Modo",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1701950965000,
      otherAccounts: { whatsapp: "+254114695349" },
    },
    description: "",
    shop: {
      _id: "65832952d715d979339e83f0",
      author: "6571b5f5ec90f199094ac068",
      image: "c4c7eab5f841f14be53b95a5fb70a58a",
      name: "Hlsea malimali shop",
      location: "Main stage kisii\r\nBusiness mall",
      isVerified: false,
      views: 13,
      timestamp: 1703094610000,

      types: { "65832952d715d979339e83f0": "65832952d715d979339e83f0" },
    },
    price: 5200,
    name: "2.1",
    timestamp: 1707716223000,
    type: empty.type,
  },
  {
    images: [],
    _id: "65ca3b4f18fb871aee1bf0cb",
    author: {
      _id: "6571b5f5ec90f199094ac068",
      username: "@Stanley",
      name: "Modo",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1701950965000,
      otherAccounts: { whatsapp: "+254114695349" },
    },
    description: "",
    shop: {
      _id: "65832952d715d979339e83f0",
      author: "6571b5f5ec90f199094ac068",
      image: "c4c7eab5f841f14be53b95a5fb70a58a",
      name: "Hlsea malimali shop",
      location: "Main stage kisii\r\nBusiness mall",
      isVerified: false,
      views: 13,
      timestamp: 1703094610000,

      types: { "65832952d715d979339e83f0": "65832952d715d979339e83f0" },
    },
    type: empty.type,
    price: 2000,
    name: "Powerbank",
    timestamp: 1707716524000,
  },
  {
    images: [],
    _id: "654265b9bcdac095e1738b6b",
    author: {
      _id: "653a3c618dc7236272642731",
      username: "@Giddy",
      name: "Gideon",
      isAdmin: false,
      hasShop: false,
      isVerified: false,
      timestamp: 1698315361000,
      otherAccounts: { whatsapp: "254740715153" },
    },
    description: "",
    shop: {
      _id: "653a3e578dc723627264274b",
      author: "653a3c618dc7236272642731",
      image: "f95190f7663fac1bf5ceedd550a2c94c",
      name: "Trendy wear boutique",
      isVerified: false,
      timestamp: 1698315863000,

      views: 24,
      types: { "653a3e578dc723627264274b": "653a3e578dc723627264274b" },
    },
    price: 250,
    name: "T-shirts",
    timestamp: 1698850233000,

    type: empty.type,
  },
];

export default { paginate };
