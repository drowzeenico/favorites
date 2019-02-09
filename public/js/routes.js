$(() => {
  let myMap, polyline

  const save = (coords) => {
    const routeName = prompt('Please, name this route');

    if(routeName != null) {
      $.post('/routes', {name: routeName, coords: coords}, (data) => {
        console.log(data)
      }, 'json');
    }
  }

  const addSaveButton = () => {
    let saveButton = new ymaps.control.Button("Save route");
    saveButton.events.add('click', function() {
      let coords = polyline.geometry.getCoordinates();
      if(coords.length == 0)
        return alert('Nothing to save =(');
      
      save(coords);
    });
    myMap.controls.add(saveButton, {
      selectOnClick: false
    });
  }

  const addClearButton = () => {
    let clearButton = new ymaps.control.Button("Clear");
    clearButton.events.add('click', function() {
      myMap.geoObjects.remove(polyline);
      createPolyline();
    });
    myMap.controls.add(clearButton, {
      selectOnClick: false
    });
  }

  const createPolyline = () => {
    polyline = new ymaps.Polyline([], {}, {
      strokeColor: '#0000aa',
      strokeWidth: 3
    });

    myMap.geoObjects.add(polyline);
    polyline.editor.startEditing();	
    polyline.editor.startDrawing();	
  }

  const init = () => {
    myMap = new ymaps.Map('map', {
        center: [56.135830, 47.238204],
        zoom: 10,
        controls: []
    });

    addClearButton();
    addSaveButton();
    createPolyline();    
  }

  ymaps.ready(init);
})