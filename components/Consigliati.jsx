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
const todoRef = firebase.database().ref("url/");

function GetData(params) {
  const [cons, setCons] = useState([]);
  useEffect(() => {
    todoRef.on("value", function (snapshot) {
      let consigliati = [];
      const obj = snapshot.val();
      const arr = Object.values(obj);
      for (let index = 0; index < 6; index++) {
        consigliati.push(arr[index]);
      }
      setCons(consigliati);
    });
  }, []);

  return (
    <>
      {cons
        .slice(0)
        .reverse()
        .map((e) => {
          return Consigliati(e);
        })}
    </>
  );
}

// catego: "Collane"
// inforamzioni: "Realizzazione in bronzo e rame. Pezzo unico. É possibile la riproduzione di modelli similari.\nI colori sono frutto di ossidazioni pertanto non riproducibili.\nIl bronzo ed il rame sono materiali nichel free."
// link: "https://firebasestorage.googleapis.com/v0/b/mmddesigne.appspot.com/o/images%2FIMG_20210826_135338_352.webp?alt=media&token=eb1663f3-4dad-479e-b922-99bf528418bf"
// new: true
// prezzo: "70,00"
// prezzoVecchio: 0
// titolo: "collana lunga fiori e cerchi"

function Consigliati(props) {
  console.log(props);
  return (
    <>
      <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 product-item">
        <div class="product-img">
          <a href="/Shop">
            <img src={props.link} alt="" class="img-responsive" />
          </a>
        </div>
        <div class="product-info text-center">
          <h3 class="product-title">
            <a href="">{props.titolo}</a>
          </h3>
          <div class="product-price">
            <span>€{props.prezzo}</span>
          </div>
          <div class="color-group"></div>
        </div>
      </div>
    </>
  );
}
