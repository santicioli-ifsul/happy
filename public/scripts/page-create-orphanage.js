// create map
const map = L.map('mapid').setView([-29.9293999,-51.0390298], 15)

// create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

// create icon for
const icon = L.icon({
  iconUrl: "./public/images/map-marker.svg",
  iconSize: [48, 58],
  iconAnchor: [29, 68],
})

let marker;

// create and add marker
map.on('click', (event) =>{
  const lat = event.latlng.lat
  const lng = event.latlng.lng
  
  document.querySelector('[name=lat]').value = lat
  document.querySelector('[name=lng]').value = lng

  //remove icon - se o marker existir ele remove
  marker && map.removeLayer(marker)

  //add icon layer
  marker = L.marker([lat,lng], { icon }).addTo(map)
})

// add photos field
function addPhotoField(){
  //pegar o container de fotos #images
  const container = document.querySelector('#images')
  
  //pegar o container para dubplicar .new-image
  const fieldsContainer = document.querySelectorAll('.new-upload')
  
  // realizar o clone da última imagem adicionada - true copia o que está dentro, false não
  const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
  
  //verificar se o campo está vazio
  const input = newFieldContainer.children[0]
  if(input.value == "")
  {
    return
  }

  //limpar o campo input
  newFieldContainer.children[0].value = ""
  
  //adicionar o clone ao container de #images
  container.appendChild(newFieldContainer)
}

// add photos field
function deleteField(event){
  const span = event.currentTarget

  const fieldsContainer = document.querySelectorAll('.new-upload')

  if(fieldsContainer.length <= 1){
    span.parentNode.children[0].value=""
    return
  }

  //deletar campo
  span.parentNode.remove()
}

// atende fim de semama
function toggleSelect(event){
  document.querySelectorAll('.button-select button')
  // .forEach(function(button){
  //   button.classList.remove('active')
  // })
  .forEach(button => button.classList.remove('active'))

  const button = event.currentTarget
  button.classList.add('active')

  const input = document.querySelector('[name="open-on-weekends"]')
  input.value = button.dataset.value
}