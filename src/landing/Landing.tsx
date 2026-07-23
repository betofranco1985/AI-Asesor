import Nav from './Nav';
import Hero from './Hero';
import TickerTape from './TickerTape';
import Manifiesto from './Manifiesto';
import Metodo from './Metodo';
import Transformacion from './Transformacion';
import Ecosistema from './Ecosistema';
import Faq from './Faq';
import CtaFinal from './CtaFinal';
import Footer from './Footer';

export default function Landing() {
  return (
    <div className="bg-abyss text-mist">
      <Nav />
      <main>
        <Hero />
        <TickerTape />
        <Manifiesto />
        <Metodo />
        <Transformacion />
        <Ecosistema />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </div>
  );
}
