import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { CalendarSelector } from './componentes/calendar-selector/CalendarSelector';
import { DropdownSelector } from './componentes/dropdown-selector/DropdownSelector';

import { addLocale } from 'primereact/api';

import './App.css';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export class App extends Component {
  constructor(props) {
    super(props);
                
    this.state = {
      date: null
    }

    addLocale('es', {
      firstDayOfWeek: 1,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Claro'
    });

    this.onFilterClick = this.onFilterClick.bind(this);
  }

  onFilterClick() {
    let interval = null;

    if (this.state.date && this.state.date[0])
      interval = this.state.date[0].toLocaleDateString();
    
    if (this.state.date && this.state.date[1])
      interval = interval + ' - ' + this.state.date[1].toLocaleDateString();
    
    this.toast.show({ severity: 'info', summary: 'Filter Days', detail: interval, life: 3000 });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Calendar Selector PoC
          </p>

          <Toast ref={(el) => this.toast = el} />

          <div className="calendar-container">
            <CalendarSelector showIcon
              className="calendar"
              locale="es"
              dateFormat="dd MM yy"
              numberOfMonths={2}
              selectionMode="range"
              readOnlyInput
              value={this.state.date}
              onChange={(e) => {
                this.setState({ date: e.value });
              }}   
              onApplyButtonClick={(e) => {
                console.log('Days interval selected...');
                console.log(this.state.date);
              }}
              onClearButtonClick={(e) => {
                console.log('Clear Days interval...');              
              }}>
            </CalendarSelector>

            <Button label="Submit" onClick={this.onFilterClick} />
            </div>
        </header>
      </div>
    );
  }
}

export default App;
