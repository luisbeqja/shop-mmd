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

function HoverProduct(props) {
  let isDisponibile;
  if (props.info.disponibile == "no") {
    isDisponibile = " NON DISPONIBILE";
  }
  return (
    <div className={`hoverProduct ${props.classe}`}>
      <div className="imgDiv">
        <h1>
          {props.info.categoria}
          <span className="exit" onClick={props.funzione}>
            x
          </span>
        </h1>
        <div
          style={{ backgroundImage: `url(${props.info.immagine})` }}
          className="imagineProdotto"
        ></div>
      </div>
      <div className="divInfo">
        <h2>{props.info.titolo}</h2>
        <p>{props.info.informaz}</p>
        <h3>{props.info.prezzo}€</h3>
        <h4> {isDisponibile}</h4>

        <a href="contact.html">
          <button>Contattami</button>
          <a
            className="acquista"
            href="https://www.etsy.com/shop/metamorphosidesign?ref=profile_header"
          >
            Acquista direttamente
          </a>
        </a>
      </div>
    </div>
  );
}

function WelcomeBack() {
  let objectFire = [];
  const [count, setCount] = useState([]);
  const [classe, setClasse] = useState("hidden");
  const [info, setInfo] = useState({});
  const [catSelezionata, setCatSelezionata] = useState("tutto");
  useEffect(() => {
    todoRef.on("value", function (snapshot) {
      const obj = snapshot.val();
      objectFire = Object.values(obj);
      setCount(Object.values(obj));
    });
  }, []);
  console.log(count);

  return (
    <div>
      <HoverProduct
        info={info}
        classe={classe}
        funzione={() => {
          setClasse("hidden");
        }}
      />
      <div className="button">
        <button
          onClick={() => {
            setCatSelezionata("Collane");
          }}
        >
          Collane
        </button>
        <button
          onClick={() => {
            setCatSelezionata("Orecchini");
          }}
        >
          Orecchini
        </button>
        <button
          onClick={() => {
            setCatSelezionata("Anelli");
          }}
        >
          Anelli
        </button>
        <button
          onClick={() => {
            setCatSelezionata("Bracciali");
          }}
        >
          Bracciali
        </button>
        <button
          onClick={() => {
            setCatSelezionata("tutto");
          }}
        >
          Tutto
        </button>
      </div>

      {count
        .slice(0)
        .reverse()
        .map((e) => {
          let isNew;
          let isDisponible;
          let isDisponibleText;
          let isHidden = "hidden";

          if (e.disponibile != "si") {
            isDisponible = "nonDisponibile";
            isDisponibleText = "NON DISPONIBILE";
          } else {
            isDisponible = " ";
          }
          if (e.new === true) {
            isNew = "New";
          }
          if (e.catego === catSelezionata) {
            isHidden = " ";
          }
          if (catSelezionata === "tutto") {
            isHidden = " ";
          }
          return (
            <div
              class={`col-md-4 col-sm-4 ${e.catego} ${isHidden} ${isDisponible}`}
              onClick={() => {
                setClasse("visible");
                setInfo({
                  immagine: e.link,
                  titolo: e.titolo,
                  prezzo: e.prezzo,
                  prezzoVecchio: e.prezzoVecchio,
                  categoria: e.catego,
                  informaz: e.inforamzioni,
                  disponibile: e.disponibile,
                });
              }}
            >
              <div class="single-product">
                <div class="product-img">
                  <a>
                    <img src={e.link} alt="" />
                  </a>
                  <span class="tag-line">{isNew}</span>
                  <div class="product-action">
                    <div class="button-top"></div>
                    <div class="button-cart">
                      <button>
                        <i class="fa fa-shopping-cart"></i> Contact
                      </button>
                    </div>
                  </div>
                </div>
                <div class="product-content">
                  <p className="categoriaP">{e.catego} </p>
                  <h3>
                    <a>{e.titolo}</a>
                  </h3>
                  <div class="price">
                    <span>{e.prezzo}€</span>
                    <span class="old">{isDisponibleText}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
