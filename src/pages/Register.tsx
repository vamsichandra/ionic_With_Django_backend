import {   IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonRouter, } from "@ionic/react";
import React from "react";
import { checkmarkDoneOutline, logInOutline, personCircleOutline } from 'ionicons/icons';

const Register: React.FC=()=>{
const doRegister=(event:any)=>{
    const router = useIonRouter();
    event.prevenDefault();
    console.log("do Register");
    router.goBack();

}



    return(


        
        <IonPage>
            <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
                <IonBackButton defaultHref="/"/>
            </IonButtons>
          <IonTitle>
              Registration Page
          </IonTitle>
          </IonToolbar>
          </IonHeader>
          <IonContent scrollY={false}>
        <IonGrid fixed>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonCard>
                <IonCardContent>
              <form onSubmit={doRegister}>
                  <IonInput fill="outline" labelPlacement="floating" label="Email" type="email">
                  </IonInput>
                  <IonInput className="ion-margin-top"fill="outline" labelPlacement="floating" label="Password" type="password">
          
                  </IonInput>
                  <IonButton type="submit" expand="block" className="ion-margin-top">
                Create Account
                  <IonIcon icon={checkmarkDoneOutline} slot="end"/>
                  </IonButton>
                  
                  
          
          
              </form>
              </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
          
          
                  
           
              </IonPage>
    );


};
export default Register;