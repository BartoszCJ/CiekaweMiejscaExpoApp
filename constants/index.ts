import arrowDown from "@/assets/icons/arrow-down.png";
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";
import chat from "@/assets/icons/chat.png";
import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import email from "@/assets/icons/email.png";
import eyecross from "@/assets/icons/eyecross.png";
import google from "@/assets/icons/google.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import lock from "@/assets/icons/lock.png";
import map from "@/assets/icons/map.png";
import out from "@/assets/icons/out.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import point from "@/assets/icons/point.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.png";
import star from "@/assets/icons/star.png";
import target from "@/assets/icons/target.png";
import to from "@/assets/icons/to.png";
import check from "@/assets/images/check.png";
import message from "@/assets/images/message.png";
import noResult from "@/assets/images/no-result.png";
import welcome1 from "@/assets/images/welcome1.jpg";
import welcome2 from "@/assets/images/welcome2.jpg";
import welcome3 from "@/assets/images/welcome3.jpg";
import rejestracja from "@/assets/images/rejestracja.jpg";

export const zdjecia = {
  welcome1,
  rejestracja,
  welcome2,
  welcome3,
  check,
  noResult,
  message,
};

export const icons = {
  arrowDown,
  arrowUp,
  backArrow,
  chat,
  checkmark,
  close,
  email,
  eyecross,
  google,
  home,
  list,
  lock,
  map,
  out,
  person,
  pin,
  point,
  profile,
  search,
  star,
  target,
  to,
};

export const onboarding = [
  {
    id: 1,
    tytul: "Aplikacja która pomoże Ci odkrywać ciekawe miejsca w okolicy!",
    opis: "Odkrywaj ciekawe i interesujące miejsca wokół ciebie.",
    zdjecie: zdjecia.welcome1,
  },
  {
    id: 2,
    tytul: "Trasa do ciekawych miejsc zaczyna się tutaj",
    opis: "Aplikacja sama wyznaczy trasę do miejsca które Ty zaznaczysz!",
    zdjecie: zdjecia.welcome2,
  },
  {
    id: 3,
    tytul: "Śledź miejsca które już odwiedziłeś!",
    opis: "Zapisuj miejsca które już zwiedziłeś, dodaj komentarz oraz opinię!",
    zdjecie: zdjecia.welcome3,
  },
];

export const data = {
  onboarding,
};
