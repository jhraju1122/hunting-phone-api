const loadPhone = async (searchText) =>{
const res  = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
const data = await res.json();
const phones = data.data;
// console.log(data.data);
displayPhones(phones);
}

const displayPhones = phones =>{
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container')

     // display show all button if there are more than 12 phone
     const showAllContainer = document.getElementById('show-all-container')
     if(phones.length > 12){
showAllContainer.classList.remove('hidden')
     }
     // display only 12 phone 
    //clear phone container cards before adding new cards
    phones = phones.slice(0,12);
    phoneContainer.textContent = '';
    phones.forEach(phone =>{
     
        // console.log(phone);
       
        //step: 2// create  a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-base-100 shadow-xl`
         //step: 3//
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
          </div>
        </div>
        
        `;

         //step: 4//append child
         phoneContainer.appendChild(phoneCard);
    })

    //hide loading spinner
    toggleLoadingSpinner(false);
}

//
const handleShowDetails = async(id) =>{
  // console.log('clicked show details', id)
//load single phone data
const res = await fetch(`https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089 ${id}`);
const data = await res.json();
const phone = data.data;
// console.log(data);
showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
  // console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;
  // show the modal
  show_details_modal.showModal();
}




// handle search button
const handleSearch = () =>{
  toggleLoadingSpinner(true);
const searchField = document.getElementById('search-field');
const searchText = searchField.value;
console.log(searchText);
loadPhone(searchText)

}

const toggleLoadingSpinner = (isLoading) =>{
  const LoadingSpinner = document.getElementById('loading-spinner');
if(isLoading){
  LoadingSpinner.classList.remove('hidden');

}
else{
  LoadingSpinner.classList.add('hidden');
}

}
// loadPhone()

// handle Show All
const handleShowAll = () =>{
  handleSearch(true);
}