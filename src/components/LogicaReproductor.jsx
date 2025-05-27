import React, { useEffect, useRef, useState } from "react";
import "./LogicaReproductor.css";
import { addFavorite } from '../lib/favorites';
import { supabase } from "../lib/supabaseClient";

const playlists = {
  fallout3: [
    {
      titulo: "Swing Doors",
      artista: "Allan Gray",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Allan_Gray_Swing_Doors.mp3",
    },
    {
      titulo: "Crazy He Calls Me",
      artista: "Billie Holiday",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Billie_Holiday%20_Crazy_He_Calls_Me.mp3",
    },
    {
      titulo: "Easy Living",
      artista: "Billie Holiday",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Billie%20Holiday-%20Easy%20Living.mp3",
    },
    {
      titulo: "Jazzy Interlude",
      artista: "Billy Munn",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Billy%20Munn%20-%20Jazzy%20Interlude.mp3",
    },
    {
      titulo: "Happy Times",
      artista: "Bob Crosby ",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Bob%20Crosby%20and%20The%20Bobcats%20-%20Happy%20Times.mp3",
    },
    {
      titulo: "Way Back Home",
      artista: "Bob Crosby ",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Bob%20Crosby%20and%20The%20Bobcats%20-%20Way%20Back%20Home.mp3",
    },
    {
      titulo: "Civilization",
      artista: "Danny Kaye & Andrews Sisters",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Danny%20Kaye%20and%20The%20Andrews%20Sisters%20-%20Civilization.mp3",
    },
    {
      titulo: "Rhythm For You",
      artista: "Eddy Christiani & Frans Poptie",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Eddy%20Christiani%20and%20Frans%20Poptie%20-%20Rythm%20For%20You.mp3",
    },
    {
      titulo: "Fox Boogie",
      artista: "Gerhard Trede",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Gerhard%20Trede%20-%20Fox%20Boogie.mp3",
    },
    {
      titulo: "Jolly Days",
      artista: "Gerhard Trede",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Gerhard%20Trede%20-%20Jolly%20Days.mp3",
    },
    {
      titulo: "I'm Tickled Pink",
      artista: "Jack Shaindlin",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Jack%20Shaindlin%20-%20I'm%20Tickled%20Pink.mp3",
    },
    {
      titulo: "Let's Go Sunning",
      artista: "Jack Shaindlin",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Jack%20Shaindlin%20-%20Let's%20Go%20Sunning.mp3",
    },
    {
      titulo: "Butcher Pete (1)",
      artista: "Roy Brown",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Roy%20Brown%20-%20Butcher%20Pete%20(Part%201).mp3",
    },
    {
      titulo: "Mighty Mighty Man",
      artista: "Roy Brown",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Roy%20Brown%20-%20Mighty%20Mighty%20Man.mp3",
    },
    {
      titulo: "Boogie Man",
      artista: "Sid Phillips",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Sid%20Phillips%20-%20Boogie%20Man.mp3",
    },
    {
      titulo: "A Wonderful Guy",
      artista: "Tex Beneke & Margaret Whiting",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/Tex%20Beneke%20and%20Margaret%20Whiting%20-%20A%20Wonderful%20Guy.mp3",
    },

    {
      titulo: "Some Rain Must Fall",
      artista: "The Ink Spots & Ella",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/The%20Ink%20Spots%20and%20Ella%20Fitzgerald%20-%20Into%20Each%20Life%20Some%20Rain%20Must%20Fall.mp3",
    },
    {
      titulo: "the World on Fire",
      artista: "The Ink Spots",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/The%20Ink%20Spots%20-%20I%20Don't%20Want%20to%20Set%20the%20World%20on%20Fire.mp3",
    },
    {
      titulo: "Maybe",
      artista: "The Ink Spots",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout3_radio/The%20Ink%20Spots%20-%20Maybe.mp3",
    },
  ],
  falloutnv: [
    {
      titulo: "A Kick In The Head",
      artista: "Dean Martin",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Ain't%20That%20A%20Kick%20In%20The%20Head.mp3",
    },
    {
      titulo: "Blue Moon",
      artista: "Frank Sinatra",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Blue%20Moon.mp3",
    },
    {
      titulo: "Butcher Pete (I)",
      artista: "Roy Brown",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Butcher%20Pete,%20Part%20I.mp3",
    },
    {
      titulo: "Butcher Pete (II)",
      artista: "Roy Brown",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Butcher%20Pete,%20Part%20II.mp3",
    },
    {
      titulo: "Civilization",
      artista: " The Andrews Sisters",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Civilisation.mp3",
    },
    {
      titulo: "Anything Goes",
      artista: "Cole Porter",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Cole%20Porter%20-%20Anything%20Goes%20(Official%20Audio).mp3",
    },
    {
      titulo: "Crazy He Calls Me",
      artista: "Billie Holiday",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Crazy%20He%20Calls%20Me.mp3",
    },
    {
      titulo: "Easy Living",
      artista: "Billie Holiday",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Easy%20Living.mp3",
    },
    {
      titulo: "Hangover Heart",
      artista: "Hank Thompson",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Hangover%20Heart.mp3",
    },
    {
      titulo: "A Wonderful Guy",
      artista: "Tex Beneke ",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/I'm%20In%20Love%20With%20A%20Wonderful%20Guy.mp3",
    },
    {
      titulo: "Mad About The Boy",
      artista: "Dinah Washington",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Mad%20About%20The%20Boy.mp3",
    },
    {
      titulo: "Big Iron",
      artista: "Marty Robbins",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Marty%20Robbins%20-%20Big%20Iron%20(Lyrics).mp3",
    },
    {
      titulo: "Orange Colored Sky",
      artista: "Nat King Cole",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Orange%20Coloured%20Sky.mp3",
    },
    {
      titulo: "Mighty Mighty Man",
      artista: "Roy Brown",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Roy%20Brown%20-%20Mighty%20Mighty%20Man%20-%20Roy%20Brown.mp3",
    },
    {
      titulo: "Home On the Range",
      artista: "Roy Rogers",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Roy%20Rogers%20-%20Home%20On%20the%20Range%20-%20Remastered%20-%20Country%20Music%20Experience.mp3",
    },
    {
      titulo: "Something's Gotta Give",
      artista: "Sammy Davis Jr.",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Something's%20Gotta%20Give.mp3",
    },
    {
      titulo: "The World On Fire",
      artista: "The Ink Spots",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Something's%20Gotta%20Give.mp3",
    },
    {
      titulo: "Some Rain Must Fall",
      artista: "In Spots Ella Fitzgerald",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/The%20Ink%20Spots%20-%20Into%20Each%20Life%20Some%20Rain%20Must%20Fall.mp3",
    },
    {
      titulo: "It's A Sin Tell A Lie",
      artista: "The Ink Spots",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/The%20Ink%20Spots%20-%20It's%20A%20Sin%20To%20Tell%20A%20Lie.mp3",
    },
    {
      titulo: "Maybe",
      artista: "The Ink Spots",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/The%20Ink%20Spots%20-%20Maybe%20(Official%20Audio).mp3",
    },
    {
      titulo: "Way Back Home",
      artista: "Bob Crosby & The Bobcats",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Way%20Back%20Home.mp3",
    },
    {
      titulo: "Why Don't You Do Right",
      artista: "Peggy Lee",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/FalloutNewVegas_radio/Why%20Don't%20You%20Do%20Right.mp3",
    },
  ],
  fallout4: [
    {
      titulo: "He's a Demon, He's ",
      artista: "Betty Hutton",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/He's%20a%20Demon,%20He's%20a%20Devil,%20He's%20a%20Doll.mp3",
    },
    {
      titulo: "It's All Over",
      artista: "The Ink Spots",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/It's%20All%20Over%20But%20the%20Crying.mp3",
    },
    {
      titulo: "It's a Man",
      artista: "Betty Hutton",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/It's%20a%20Man.mp3",
    },
    {
      titulo: "Keep a Knockin'",
      artista: "Little Richard",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Keep%20a%20Knockin'.mp3",
    },
    {
      titulo: "One More Tomorrow",
      artista: "Frankie Carle",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/One%20More%20Tomorrow.mp3",
    },
    {
      titulo: "Orange Colored Sky",
      artista: "Nat King Cole",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Orange%20Colored%20Sky.mp3",
    },
    {
      titulo: "Personality",
      artista: "Lloyd Price",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Personality.mp3",
    },
    {
      titulo: "Pistol Packin' Mama",
      artista: "Bing Crosby & Andrews Sisters",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Pistol%20Packin'%20Mama.mp3",
    },
    {
      titulo: "Right Behind You",
      artista: "Ray Smith",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Right%20Behind%20You%20Baby.mp3",
    },
    {
      titulo: "Rocket 69",
      artista: "Connie Allen",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Rocket%2069.mp3",
    },
    {
      titulo: "Sixty Minute Man",
      artista: "The Dominoes",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Sixty%20Minute%20Man.mp3",
    },
    {
      titulo: "The End of the World",
      artista: "Skeeter Davis",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/The%20End%20of%20the%20World.mp3",
    },
    {
      titulo: "The Wanderer",
      artista: "Dion",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/The%20Wanderer.mp3",
    },
    {
      titulo: "Undecided",
      artista: "The Onyx Club Boys",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Undecided.mp3",
    },
    {
      titulo: "Uranium Fever",
      artista: "Elton Britt",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Uranium%20Fever.mp3",
    },
    {
      titulo: "Uranium Rock",
      artista: "Warren Smith",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Uranium%20Rock.mp3",
    },
    {
      titulo: "Shakin' Goin' On",
      artista: "Jerry Lee Lewis",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Whole%20Lotta%20Shakin'%20Goin'%20On.mp3",
    },
    {
      titulo: "Worry Worry Worry",
      artista: "Roy Brown",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Worry%20Worry%20Worry.mp3",
    },
    {
      titulo: "Accentuate  Positive",
      artista: "Johnny Mercer",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Accentuate%20the%20Positive.mp3",
    },
    {
      titulo: "Atom Bomb Baby",
      artista: "The Five Stars",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Atom%20Bomb%20Baby.mp3",
    },
    {
      titulo: "Butcher Pete, 2",
      artista: "Roy Brown",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Butcher%20Pete,%20Part%202.mp3",
    },
    {
      titulo: "Through the Fallout",
      artista: "Sheldon Allman",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Crawl%20Out%20Through%20the%20Fallout.mp3",
    },
    {
      titulo: "Dear Hearts ",
      artista: "Bob Crosby & The Bobcats",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Dear%20Hearts%20and%20Gentle%20People.mp3",
    },
    {
      titulo: "Good Rocking Tonight",
      artista: "Roy Brown",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Good%20Rocking%20Tonight.mp3",
    },
    {
      titulo: "Grandma Plays ",
      artista: "Wynonie Harris",
      url: "https://kvzddbfkrkmcernfbxen.supabase.co/storage/v1/object/public/canciones/Fallout4_radio/Grandma%20Plays%20the%20Numbers.mp3",
    },
  ],
};
const nombreEmisoras = {
  fallout3: "Radio Galaxia",
  falloutnv: "Radio New Vegas",
  fallout4: "Diamond City Radio",
};

function LogicaReproductor({ onClose }) {
  const [juego, setJuego] = useState("fallout3");
  const [cancionActual, setCancionActual] = useState(0);
  const [volumen, setVolumen] = useState(0.5);
  const [user, setUser] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const audioRef = useRef(null);

  const canciones = playlists[juego];
  const cancion = canciones[cancionActual];

 useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
      else console.error("Error al obtener el usuario:", error);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchFavoritos = async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("song_url, song_title")
        .eq("user_id", user.id);

      if (error) console.error("Error al cargar favoritos:", error);
      else setFavoritos(data);
    };
    fetchFavoritos();
  }, [user]);


 useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumen;
      audioRef.current.play().catch(() => {});
    }
  }, [cancionActual, juego]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumen;
    }
  }, [volumen]);

  const cambiarJuego = (nuevoJuego) => {
    // 🔊 Reproducir sonido aleatorio
    const efectos = [
      "/efectosAudio/cambioEmisora.mp3",
      "/efectosAudio/cambioEmisora2.mp3",
    ];



    const efectoElegido = new Audio(efectos[Math.floor(Math.random() * efectos.length)]);
    efectoElegido.play().catch(() => {});

    setJuego(nuevoJuego);
    const indiceAleatorio = Math.floor(Math.random() * playlists[nuevoJuego].length);
    setCancionActual(indiceAleatorio);


    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }, 100);
  };


 const reproducirFavoritoAleatorio = () => {
    if (!favoritos.length) {
      alert("No tienes canciones favoritas aún.");
      return;
    }

    const aleatoria = favoritos[Math.floor(Math.random() * favoritos.length)];
    const audio = new Audio(aleatoria.song_url);
    audio.volume = volumen;
    audio.play().catch(() => {});
  };


 return (
    <div className="pipboy-reproductor">
      <img src="/img/PipBoy_Uso.png" alt="PipBoy" className="pipboy-fondo" />

      <div className="pantalla-terminal">
        <h2 className="nombre-radio">{nombreEmisoras[juego]}</h2>
        <h3>{cancion.titulo}</h3>
        <p>{cancion.artista}</p>

        <button
          className="fav-btn"
          onClick={() => {
            if (!user) return alert("Debes iniciar sesión para añadir favoritos.");
            addFavorite({
              userId: user.id,
              url: cancion.url,
              title: cancion.titulo,
            });
          }}
        >
          ❤
        </button>

        <button
          className="fav-btn"
          onClick={reproducirFavoritoAleatorio}
          style={{ marginTop: "10px" }}
        >
          ▶ Favorito
        </button>

        <label htmlFor="volumen-slider" className="volumen-label">
          Volumen
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volumen}
          onChange={(e) => setVolumen(parseFloat(e.target.value))}
        />
      </div>

      <button className="cerrar" onClick={onClose}>
        X
      </button>

      <div className="botones-fisicos">
        <div
          className={`boton rojo ${juego === "fallout3" ? "activo" : ""}`}
          onClick={() => cambiarJuego("fallout3")}
        />
        <div
          className={`boton azul ${juego === "falloutnv" ? "activo" : ""}`}
          onClick={() => cambiarJuego("falloutnv")}
        />
        <div
          className={`boton verde ${juego === "fallout4" ? "activo" : ""}`}
          onClick={() => cambiarJuego("fallout4")}
        />
      </div>

      <audio
        ref={audioRef}
        src={cancion.url}
        autoPlay
        onEnded={() => setCancionActual((cancionActual + 1) % canciones.length)}
      />
    </div>
  );
}

export default LogicaReproductor;