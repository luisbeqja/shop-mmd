const { useState, useEffect } = React;

var firebaseConfig = {
  apiKey: "AIzaSyDCC2DH4VL1TCO9m-eqhQLJnUx8li26jLk",
  authDomain: "mmddesigne.firebaseapp.com",
  projectId: "mmddesigne",
  storageBucket: "mmddesigne.appspot.com",
  messagingSenderId: "475825936411",
  appId: "1:475825936411:web:e16aac6ff9a3fef45600be",
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

function WelcomeBack2(params) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [oggetto, setOggetto] = useState("");
  const [testo, setTesto] = useState("");
  const [grazoe, setGrazope] = useState("");

  function uploadData() {
    setGrazope("Grazie per il tuo messaggio !");
    const todoRef = firebase.database().ref("email");
    todoRef.push({
      nome: nome,
      email: email,
      oggetto: oggetto,
      testo: testo,
    });
  }
  return (
    <form>
      <div class="input-filed">
        <div class="col-md-6">
          <input
            name="name"
            type="text"
            placeholder="Nome"
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
        </div>
        <div class="col-md-6">
          <input
            name="email"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div class="col-md-12">
          <input
            name="subject"
            type="text"
            placeholder="Oggetto"
            name="email"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setOggetto(e.target.value);
            }}
          />
        </div>
      </div>
      <div class="col-md-12">
        <div class="contact-textarea">
          <textarea
            name="message"
            id="Message"
            cols="30"
            rows="10"
            placeholder="Messaggio"
            onChange={(e) => {
              setTesto(e.target.value);
            }}
          ></textarea>
          <p id="invia" onClick={uploadData}>
            Invia
          </p>
          <p id="grazie">{grazoe}</p>
        </div>
      </div>
    </form>
  );
}
