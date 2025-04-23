import React, { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonToast, IonIcon
} from '@ionic/react';
import DateTimePicker from '../components/DateTimePicker';
import axios from 'axios';
import { trash } from 'ionicons/icons';

const GestionReservas: React.FC = () => {
  const [nombreCliente, setNombreCliente] = useState('');
  const [contacto, setContacto] = useState('');
  const [mesa, setMesa] = useState('');
  const [fechaHora, setFechaHora] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [reservas, setReservas] = useState<any[]>([]);

  const cargarReservas = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/reservas');
      setReservas(response.data);
    } catch (error) {
      console.error('Error al cargar reservas', error);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const handleGuardar = async () => {
    try {
      const reserva = { nombreCliente, contacto, mesa, fechaHora };
      await axios.post('http://localhost:8081/api/reservas', reserva);
      setMensaje('✅ Reserva guardada exitosamente');
      cargarReservas();
      setNombreCliente('');
      setContacto('');
      setMesa('');
      setFechaHora('');
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al guardar la reserva');
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8081/api/reservas/${id}`);
      setMensaje('🗑️ Reserva eliminada');
      cargarReservas();
    } catch (error) {
      console.error('Error al eliminar reserva', error);
      setMensaje('❌ No se pudo eliminar la reserva');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestión de Reservas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Nombre del Cliente</IonLabel>
          <IonInput value={nombreCliente} onIonChange={e => setNombreCliente(e.detail.value!)} placeholder="Juan Pérez" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Contacto</IonLabel>
          <IonInput value={contacto} onIonChange={e => setContacto(e.detail.value!)} placeholder="3001234567" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Mesa</IonLabel>
          <IonInput value={mesa} onIonChange={e => setMesa(e.detail.value!)} placeholder="Mesa 5" />
        </IonItem>

        <DateTimePicker label="Fecha y Hora" value={fechaHora} onChange={setFechaHora} />

        <IonButton expand="full" className="ion-margin-top" onClick={handleGuardar}>
          Guardar Reserva
        </IonButton>

        <IonToast
          isOpen={!!mensaje}
          message={mensaje}
          duration={3000}
          onDidDismiss={() => setMensaje('')}
        />

        <h2 className="ion-margin-top">Reservas Registradas</h2>
        {reservas.length === 0 ? (
          <p>No hay reservas registradas.</p>
        ) : (
          <table style={{ width: '100%', marginTop: '1rem', border: '1px solid #ccc' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Contacto</th>
                <th>Mesa</th>
                <th>Fecha y Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.nombreCliente}</td>
                  <td>{reserva.contacto}</td>
                  <td>{reserva.mesa}</td>
                  <td>{reserva.fechaHora}</td>
                  <td>
                    <IonButton
                      color="danger"
                      size="small"
                      onClick={() => handleEliminar(reserva.id)}
                    >
                      <IonIcon icon={trash} slot="icon-only" />
                    </IonButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </IonContent>
    </IonPage>
  );
};

export default GestionReservas;
