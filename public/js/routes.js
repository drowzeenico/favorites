$(() => {
  let myMap, polyline, selectedArea;
  let mapObjects = [];

  const save = (coords) => {
    const routeName = prompt('Please, name this route');

    if(routeName != null) {
      const routeObject = {
        name: routeName, 
        coords: coords
      };
      
      $.post('/routes', routeObject, (data) => {
        if(data.area) {
          let coords = data.area;
          makePolygon(coords);
        } else {
          alert('Something went wrong...');
        }
      }, 'json');
    }
  }

  const makePolygon = (coords) => {
    myMap.geoObjects.remove(selectedArea);
    selectedArea = new ymaps.Polygon([coords], null, {
      opacity: 0.8
    });

    mapObjects.push(selectedArea);
    myMap.geoObjects.add(selectedArea);
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
      clearObjects();
      createPolyline();
    });
    myMap.controls.add(clearButton, {
      selectOnClick: false
    });
  }

  clearObjects = () => {
    mapObjects.forEach(obj => {
      myMap.geoObjects.remove(obj);
    })
  }

  const createPolyline = (coords = []) => {
    polyline = new ymaps.Polyline(coords, {}, {
      strokeColor: '#0000aa',
      strokeWidth: 3
    });

    mapObjects.push(polyline);
    myMap.geoObjects.add(polyline);
    if(coords.length == 0) {
      polyline.editor.startEditing();	
      polyline.editor.startDrawing();	
    }
  }

  const init = () => {
    myMap = new ymaps.Map('map', {
        center: [56.135830, 47.238204],
        zoom: 14,
        controls: []
    });

    addClearButton();
    addSaveButton();
    createPolyline();    
  }

  $('.get_route').click(function (e) {
    clearObjects();
    const id = $(this).data('id');
    $.get('/routes/' + id, data => {

      if(data.area && data.original) {
        createPolyline(data.original.coordinates);
        makePolygon(data.area.coordinates[0]);
      }
    });
  })

  $('.find_nearby_routes').click(function (e) {
    clearObjects();
    const id = $(this).data('id');
    $.get('/routes/nearby/' + id, data => {
      if(data.routes.length > 0) {
        data.routes.forEach(r => {
          let myPolyline = new ymaps.Polyline(r.original.coordinates, {}, {
            strokeColor: '#0000aa',
            strokeWidth: 2
          });

          let myPolylineArea = new ymaps.Polygon(r.area.coordinates, null, {
            fillColor: '#00aa00',
            opacity: 0.3,
            zIndexHover: 1000
          });

          myPolylineArea.events.add('click', function(e) {
            let content = `
              User: <b>${r.firstName} ${r.lastName}</b><br>
              Route name - <b>${r.name}</b><br><br>
              <button class="btn btn-blue">Send request</button>
            `;
            myMap.balloon.open(e.get('coords'), content, {});
          });

          mapObjects.push(myPolyline, myPolylineArea);
          myMap.geoObjects.add(myPolyline);
          myMap.geoObjects.add(myPolylineArea);
        });
      }
    });
  })

  ymaps.ready(init);
})