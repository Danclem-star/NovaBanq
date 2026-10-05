import { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const imageRoot = `${import.meta.env.BASE_URL}images/`;

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="NovaBanq home">
      <svg className="brand-mark" viewBox="0 0 28 26" fill="none" aria-hidden="true">
        <path d="M4 20V6l20 14V6" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Novabanq</span>
    </a>
  );
}

const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function reveal(reducedMotion: boolean, delay = 0) {
  return {
    initial: reducedMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.16 },
    transition: {
      duration: reducedMotion ? 0 : 0.85,
      delay: reducedMotion ? 0 : delay,
      ease: cinematicEase,
    },
  };
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLElement>(null!);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reducedMotion ? 0 : 38],
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site" id="top">
      <section ref={heroRef} className="hero frame" aria-labelledby="hero-title">
        <motion.img className="hero-photo" src={`${imageRoot}hero.png`} alt="A woman smiling as she uses her phone" fetchPriority="high" style={{ y: heroParallax }} initial={reducedMotion ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 0.82, scale: 1 }} transition={{ duration: reducedMotion ? 0 : 1.5, ease: cinematicEase }} />
        <header className="topbar">
          <Brand />
          <nav className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
            <a href="#meet" onClick={closeMenu}>Product</a>
            <a href="#send" onClick={closeMenu}>How it works</a>
            <a href="#send" onClick={closeMenu}>For businesses</a>
            <a href="#nova" onClick={closeMenu}>About</a>
          </nav>
          <a className="top-cta" href="#final-cta">Get started</a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </header>
        <div className="hero-copy">
          <h1 id="hero-title"><span><em>One account.</em></span><span><em>All of Africa.</em></span></h1>
          <p className="hero-lede">Send, receive and move money across African borders with one simple NovaBanq account.</p>
          <div className="actions">
            <a className="button button-light" href="#final-cta">Get started</a>
            <a className="button button-outline" href="#send">See how it works</a>
          </div>
        </div>
      </section>

      <section className="split-section problem frame" id="problem" aria-labelledby="problem-title">
        <motion.div className="section-copy" {...reveal(reducedMotion)}>
          <h2 className="section-title" id="problem-title">Africa is connected.<br />Its money isn't.</h2>
          <p>Different currencies, different payment rails, different apps. More friction.</p>
        </motion.div>
        <motion.div className="problem-art" {...reveal(reducedMotion, 0.12)}>
          <img className="problem-phone" src={`${imageRoot}middle-phone.png`} alt="NovaBanq wallet beside labels for mobile money, M-pesa and Orange money" loading="lazy" />
        </motion.div>
      </section>

      <section className="split-section meet frame" id="meet" aria-labelledby="meet-title">
        <motion.div className="meet-art" {...reveal(reducedMotion)}>
          <img className="meet-photo" src={`${imageRoot}novabanq-model.png`} alt="Woman in a magenta jacket looking at her phone" loading="lazy" />
        </motion.div>
        <motion.div className="meet-product" {...reveal(reducedMotion, 0.12)}>
          <div className="section-copy">
            <h2 className="section-title" id="meet-title">Meet Novabanq</h2>
            <p>One account, one @tag. Multiple African currencies.</p>
          </div>
          <img className="meet-phone" src={`${imageRoot}dashboard-phone.png`} alt="NovaBanq multi-currency account dashboard on a phone" loading="lazy" />
        </motion.div>
      </section>

      <section className="split-section tag-section frame" id="tag" aria-labelledby="tag-title">
        <motion.div className="section-copy" {...reveal(reducedMotion)}>
          <h2 className="section-title" id="tag-title">Your identity.<br />Your money.<br />One @tag.</h2>
          <p>Share your Novabanq @tag and get paid without asking people to navigate complicated account numbers.</p>
        </motion.div>
        <motion.div className="tag-art" {...reveal(reducedMotion, 0.12)}>
          <img className="tag-phone" src={`${imageRoot}account-tag-phone.png`} alt="NovaBanq app prompt to create an account tag" loading="lazy" />
        </motion.div>
      </section>

      <section className="send-section frame" id="send" aria-labelledby="send-title">
        <motion.div className="section-copy" {...reveal(reducedMotion)}>
          <h2 className="section-title" id="send-title">Money should move<br />as easily as you do.</h2>
          <p>Select recipient, choose corridor, enter amount, see the rate, review and confirm.</p>
        </motion.div>
        <div className="phone-sequence" aria-label="NovaBanq app screens">
          <motion.img className="sequence-phone" {...reveal(reducedMotion)} src={`${imageRoot}send-screen-1.png`} alt="Send-money screen: recipient account selection" loading="lazy" />
          <motion.img className="sequence-phone" {...reveal(reducedMotion, 0.15)} src={`${imageRoot}send-screen-2.png`} alt="Send-money screen: amount entry and currency conversion" loading="lazy" />
          <motion.img className="sequence-phone" {...reveal(reducedMotion, 0.3)} src={`${imageRoot}send-screen-3.png`} alt="Send-money screen: transfer review and confirmation" loading="lazy" />
        </div>
      </section>

      <section className="nova-section frame" id="nova" aria-labelledby="nova-title">
        <motion.div className="section-copy" {...reveal(reducedMotion)}>
          <h2 className="section-title" id="nova-title">Meet Nova</h2>
          <p>Nova is a cool companion inside the app, Nova helps you send and schedule payments easily.</p>
        </motion.div>
        <motion.div className="nova-photo-wrap" {...reveal(reducedMotion, 0.12)}>
          <img className="nova-photo" src={`${imageRoot}nova-mascot.png`} alt="Nova, the green NovaBanq companion holding a phone" loading="lazy" />
        </motion.div>
      </section>

      <section className="final-cta frame" id="final-cta" aria-labelledby="cta-title">
        <motion.h2 className="section-title" {...reveal(reducedMotion)} id="cta-title">Let's make<br />Africa pay itself</motion.h2>
        <motion.p {...reveal(reducedMotion, 0.12)}>One account, one @tag. A simpler way to move money across Africa.</motion.p>
        <motion.div className="actions" {...reveal(reducedMotion, 0.24)}>
          <a className="button button-dark" href="mailto:hello@novabanq.com">Get started</a>
          <a className="button button-outline" href="#send">See how it works</a>
        </motion.div>
      </section>

      <section className="footer frame" id="africa-moves" aria-labelledby="footer-title">
        <motion.h2 className="footer-heading" {...reveal(reducedMotion)} id="footer-title">AFRICA<br />MOVES.</motion.h2>
        <div className="footer-brand"><Brand /></div>
        <div className="footer-columns">
          <div className="footer-col">
            <h3>Product</h3>
            <ul>
              <li><a href="#send">Send money</a></li><li><a href="#send">Receive money</a></li><li><a href="#send">Convert</a></li><li><a href="#meet">Changelog</a></li><li><a href="#meet">Multi-currency</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <ul><li><a href="#nova">About us</a></li><li><a href="#nova">Careers</a></li><li><a href="mailto:hello@novabanq.com">Contact</a></li></ul>
          </div>
          <div className="footer-col">
            <h3>Resources</h3>
            <ul><li><a href="#send">Help center</a></li><li><a href="#send">Security</a></li><li><a href="#send">Privacy</a></li><li><a href="#send">Terms</a></li></ul>
          </div>
          <div className="footer-col">
            <h3>Socials</h3>
            <ul><li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li><li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li><li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li></ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
