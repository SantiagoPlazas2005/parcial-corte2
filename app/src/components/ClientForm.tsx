import { IonItem, IonLabel, IonInput } from '@ionic/react';
import { useState } from 'react';

type Props = {
  onClientChange: (client: { nombre: string; contacto: string }) => void;
};

const ClientForm = ({ onClientChange }: Props) => {
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');

  const handleChange = () => {
    onClientChange({ nombre, contacto });
  };

  return (
    <>
      <IonItem>
        <IonLabel position="stacked">Nombre</IonLabel>
        <IonInput
          value={nombre}
          onIonChange={(e) => {
            setNombre(e.detail.value!);
            handleChange();
          }}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Contacto</IonLabel>
        <IonInput
          value={contacto}
          onIonChange={(e) => {
            setContacto(e.detail.value!);
            handleChange();
          }}
        />
      </IonItem>
    </>
  );
};

export default ClientForm;

