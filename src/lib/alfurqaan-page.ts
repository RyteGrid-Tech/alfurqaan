export const alFurqaanHtml = `
<style>
.af-page *{box-sizing:border-box;margin:0;padding:0}
.af-page{font-family:'Cormorant Garamond',Georgia,serif;font-size:19px;line-height:1.65;color:#0c2b22;background:#f4efe0;overflow-x:hidden}
.af-page ::selection{background:#c9a35c;color:#07201a}
.af-page h1,.af-page h2,.af-page h3,.af-page h4{font-family:'Marcellus',serif;font-weight:400;line-height:1.15}
.af-page a{color:inherit;text-decoration:none}
.af-page button{font-family:inherit;cursor:pointer}
.af-page button:disabled{cursor:not-allowed;opacity:.55}
.af-grain{position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:.05;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");mix-blend-mode:multiply}
.eyebrow{font-family:'Jost',sans-serif;font-size:11.5px;letter-spacing:.34em;text-transform:uppercase;color:#a9713f;display:flex;align-items:center;gap:14px;margin-bottom:7px}
.section-head{max-width:860px;margin:0 auto 56px;text-align:center}
.section-head h2{font-size:clamp(2rem,4vw,2.7rem);margin:12px 0 10px;color:#07201a}
.section-head .eyebrow{justify-content:center}
.section-note{color:#6c7a66;font-size:18.5px;font-style:italic}
.site-head{position:sticky;top:0;z-index:900;backdrop-filter:blur(12px);background:rgba(244,239,224,.88);border-bottom:1px solid rgba(12,43,34,.08);transition:box-shadow .3s}
.site-head.scrolled{box-shadow:0 4px 24px rgba(7,32,26,.08)}
.head-inner{display:flex;align-items:center;gap:24px;max-width:1240px;margin:0 auto;padding:14px 28px}
.brand{display:flex;align-items:center;gap:14px;margin-right:auto}
.brand-seal{width:46px;height:46px;display:grid;place-items:center;font-size:22px;color:#e2c380;background:#07201a;border:1px solid rgba(201,163,92,.25)}
.brand-text{display:flex;flex-direction:column;line-height:1.1}
.brand-text strong{font-family:'Marcellus',serif;font-size:18px;color:#0c2b22;font-weight:400}
.brand-text em{font-family:'Cormorant Garamond',serif;font-size:13px;color:#8fa893;font-style:italic}
.head-nav{display:flex;gap:28px;align-items:center}
.head-nav a{font-family:'Jost',sans-serif;font-size:13.5px;letter-spacing:.06em;color:#5a6b58;text-transform:uppercase;transition:color .2s;position:relative}
.head-nav a:hover{color:#0c2b22}
.head-nav a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:#c9a35c;transition:width .3s}
.head-nav a:hover::after{width:100%}
.head-actions{display:flex;gap:6px;align-items:center}
.icon-btn{width:40px;height:40px;display:grid;place-items:center;background:none;border:1px solid rgba(12,43,34,.1);color:#5a6b58;transition:all .2s;position:relative}
.icon-btn:hover{color:#0c2b22;border-color:#c9a35c}
.icon-btn svg{width:18px;height:18px}
.cart-count{position:absolute;top:-4px;right:-4px;width:18px;height:18px;border-radius:50%;background:#c9a35c;color:#07201a;font-family:'Jost',sans-serif;font-size:10px;font-weight:600;display:grid;place-items:center}
.searchbar{max-width:600px;margin:0 auto;padding:10px 28px 16px}
.searchbar-inner{display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(12,43,34,.15);padding-bottom:6px}
.searchbar-inner svg{width:17px;height:17px;color:#8fa893;flex-shrink:0}
.searchbar-inner input{flex:1;border:none;background:none;font-family:'Cormorant Garamond',serif;font-size:19px;color:#0c2b22;outline:none}
.searchbar-inner input::placeholder{color:#8fa893;font-style:italic}
.search-clear{background:none;border:none;font-size:22px;color:#8fa893;cursor:pointer;padding:0 4px}
.hero{position:relative;min-height:92vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px 28px 80px;overflow:hidden}
.hero-orn{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:.55}
.hero-star{width:min(80vw,560px);height:min(80vw,560px);animation:heroSpin 48s linear infinite}
@keyframes heroSpin{to{transform:rotate(360deg)}}
.hero-kicker{font-family:'Cormorant Garamond',serif;font-size:22px;font-style:italic;color:#8fa893;margin-bottom:32px;position:relative;z-index:1}
.bismark{font-size:38px;display:block;color:#c9a35c;margin-bottom:10px;line-height:1}
.hero-title{font-family:'Marcellus',serif;font-size:clamp(2.8rem,7vw,5.2rem);font-weight:400;line-height:1.05;color:#07201a;position:relative;z-index:1;margin-bottom:24px}
.hero-title .line{display:block}
.hero-title .gold{color:#c9a35c}
.hero-sub{max-width:600px;font-size:20px;color:#5a6b58;margin-bottom:42px;position:relative;z-index:1;line-height:1.6}
.hero-sub strong{font-weight:600;color:#0c2b22}
.hero-cta{display:flex;gap:16px;flex-wrap:wrap;justify-content:center;position:relative;z-index:1;margin-bottom:48px}
.hero-meta{display:flex;gap:32px;font-family:'Jost',sans-serif;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#8fa893;position:relative;z-index:1}
.btn{padding:13px 30px;font-family:'Jost',sans-serif;font-size:13.5px;letter-spacing:.06em;text-transform:uppercase;border:1px solid transparent;transition:all .3s;display:inline-flex;align-items:center;gap:8px;text-decoration:none;cursor:pointer}
.btn-primary{background:#0c2b22;color:#f4efe0;border-color:#0c2b22}
.btn-primary:hover{background:#c9a35c;border-color:#c9a35c;color:#07201a}
.btn-ghost{background:transparent;color:#0c2b22;border-color:rgba(12,43,34,.2)}
.btn-ghost:hover{border-color:#c9a35c;color:#c9a35c}
.btn-ghost-dark{background:transparent;color:#f4efe0;border-color:rgba(244,239,224,.3)}
.btn-ghost-dark:hover{border-color:#e2c380;color:#e2c380}
.full{width:100%;justify-content:center}
.ticker{background:#07201a;overflow:hidden;white-space:nowrap;padding:12px 0}
.ticker-track{display:inline-flex;gap:24px;animation:ticker 32s linear infinite;font-family:'Cormorant Garamond',serif;font-size:16px;font-style:italic;color:#c9a35c}
.ticker-track span{font-style:normal;color:#8fa893}
@keyframes ticker{to{transform:translateX(-50%)}}
.catalogue{padding:100px 28px 80px;max-width:1240px;margin:0 auto}
.filterbar{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:42px}
.filter-chips{display:flex;gap:8px;flex-wrap:wrap}
.chip{font-family:'Jost',sans-serif;font-size:12.5px;letter-spacing:.05em;text-transform:uppercase;padding:7px 18px;border:1px solid rgba(12,43,34,.15);background:transparent;color:#5a6b58;cursor:pointer;transition:all .2s}
.chip.active,.chip:hover{background:#0c2b22;color:#f4efe0;border-color:#0c2b22}
.format-toggle{display:flex;align-items:center;gap:10px;cursor:pointer}
.format-toggle input{display:none}
.toggle-track{width:44px;height:24px;border-radius:12px;background:rgba(12,43,34,.12);position:relative;transition:background .3s}
.toggle-knob{position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#f4efe0;box-shadow:0 1px 4px rgba(0,0,0,.15);transition:transform .3s}
.format-toggle input:checked+.toggle-track{background:#0c2b22}
.format-toggle input:checked+.toggle-track .toggle-knob{transform:translateX(20px)}
.toggle-label{font-family:'Jost',sans-serif;font-size:12px;color:#6c7a66}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:36px 24px}
.card{display:flex;flex-direction:column;animation:fadeUp .5s ease both}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.card-cover{position:relative;aspect-ratio:3/4;overflow:hidden;margin-bottom:14px;cursor:pointer;transition:transform .3s,box-shadow .3s}
.card-cover:hover{transform:translateY(-4px);box-shadow:0 18px 42px rgba(7,32,26,.2)}
.card-cover img,.card-cover svg{width:100%;height:100%;object-fit:cover;display:block}
.card-badge{position:absolute;top:12px;right:12px;font-family:'Jost',sans-serif;font-size:10px;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;background:#e2c380;color:#07201a}
.card-format{display:flex;gap:6px;margin-bottom:10px}
.card-format button{font-family:'Jost',sans-serif;font-size:10.5px;letter-spacing:.04em;text-transform:uppercase;padding:4px 12px;border:1px solid rgba(12,43,34,.12);background:transparent;color:#8fa893;transition:all .2s}
.card-format button.active{background:#0c2b22;color:#f4efe0;border-color:#0c2b22}
.card-title{font-family:'Marcellus',serif;font-size:18px;color:#0c2b22;margin-bottom:4px}
.card-author{font-size:15px;color:#8fa893;font-style:italic;margin-bottom:8px}
.card-footer{display:flex;justify-content:space-between;align-items:center;margin-top:auto}
.card-price{font-family:'Marcellus',serif;font-size:17px;color:#c9a35c}
.card-add{width:32px;height:32px;display:grid;place-items:center;border:1px solid rgba(12,43,34,.12);background:transparent;color:#5a6b58;font-size:18px;transition:all .2s}
.card-add:hover{border-color:#c9a35c;color:#c9a35c;background:rgba(201,163,92,.06)}
.empty{text-align:center;color:#8fa893;font-size:20px;font-style:italic;padding:60px 0}
.why{background:#07201a;color:#ece5d2;padding:100px 28px 80px;position:relative;overflow:hidden}
.why::before{content:'';position:absolute;inset:0;background:radial-gradient(800px 400px at 80% 20%,rgba(201,163,92,.06),transparent 60%);pointer-events:none}
.section-head.light .eyebrow{color:#c9a35c}
.section-head.light h2{color:#ece5d2}
.section-head.light .eyebrow::before,.section-head.light .eyebrow::after{background:rgba(201,163,92,.25)}
.why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:28px;max-width:1040px;margin:0 auto 56px}
.why-card{padding:28px;border:1px solid rgba(201,163,92,.12);transition:border-color .3s;background:rgba(7,32,26,.4)}
.why-card:hover{border-color:rgba(201,163,92,.35)}
.why-num{font-family:'Marcellus',serif;font-size:40px;color:#c9a35c;line-height:1;display:block;margin-bottom:14px;opacity:.7}
.why-card h3{font-size:20px;margin-bottom:10px}
.why-card p{font-size:16px;color:#8fa893;line-height:1.6}
.why-foot{text-align:center;max-width:700px;margin:0 auto}
.why-foot .arabic{font-size:42px;color:#c9a35c;display:block;margin-bottom:16px}
.why-foot p{font-family:'Cormorant Garamond',serif;font-size:22px;font-style:italic;margin-bottom:6px}
.why-foot cite{font-size:15px;color:#8fa893}
.reading{background:linear-gradient(180deg,#ece5d2 0%,#f4efe0 100%);padding:100px 28px 80px}
.reading-inner{display:flex;gap:60px;max-width:1040px;margin:0 auto;align-items:center;flex-wrap:wrap}
.reading-text{flex:1;min-width:300px}
.reading-text .eyebrow{margin-bottom:10px}
.reading-text h2{font-size:clamp(2rem,4vw,2.7rem);color:#07201a;margin-bottom:16px}
.reading-lead{font-size:19px;color:#5a6b58;margin-bottom:24px;line-height:1.6}
.reading-list{list-style:none;display:flex;flex-direction:column;gap:14px;margin-bottom:28px}
.reading-list li{font-size:17px;color:#5a6b58;line-height:1.5;padding-left:20px;position:relative}
.reading-list li::before{content:'*';position:absolute;left:0;color:#c9a35c;font-size:14px;line-height:1.7}
.reading-stack{position:relative;width:200px;height:260px;flex-shrink:0}
.stack-book{position:absolute;width:160px;height:220px;background:#0c2b22;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:20px;text-align:center;transition:transform .3s}
.stack-book:nth-child(1){top:0;left:0;z-index:3;transform:rotate(-4deg);background:#0c2b22}
.stack-book:nth-child(2){top:10px;left:16px;z-index:2;transform:rotate(2deg);background:#143b2f}
.stack-book:nth-child(3){top:20px;left:32px;z-index:1;transform:rotate(8deg);background:#1d4f3f}
.stack-book:hover{transform:rotate(0deg) scale(1.05)!important}
.stack-book span{font-family:'Marcellus',serif;font-size:15px;color:#e2c380;margin-bottom:4px}
.stack-book em{font-size:12px;color:#8fa893;font-style:italic}
.contact{background:#f4efe0;padding:80px 28px 0}
.contact-card{max-width:860px;margin:0 auto 56px;display:flex;gap:40px;align-items:center;flex-wrap:wrap;justify-content:space-between;padding:48px;border:1px solid rgba(12,43,34,.08);background:rgba(244,239,224,.6)}
.contact-card h2{font-size:clamp(1.6rem,3vw,2.2rem);color:#07201a;margin-bottom:6px}
.contact-card p{color:#6c7a66;font-size:16px}
.letter-form{display:flex;gap:8px;flex-shrink:0}
.letter-form input{font-family:'Cormorant Garamond',serif;font-size:17px;padding:12px 18px;border:1px solid rgba(12,43,34,.15);background:#fff;color:#0c2b22;min-width:240px;outline:none}
.letter-form input:focus{border-color:#c9a35c}
.form-msg{font-size:13px;color:#8fa893;margin-top:6px}
.site-foot{max-width:1240px;margin:0 auto;padding:0 28px 60px;display:flex;flex-wrap:wrap;gap:40px;align-items:flex-start}
.foot-brand{display:flex;gap:14px;align-items:flex-start;min-width:220px}
.foot-brand .brand-seal{flex-shrink:0}
.foot-brand strong{font-family:'Marcellus',serif;font-size:16px;color:#0c2b22;display:block;margin-bottom:4px}
.foot-brand p{font-size:14px;color:#8fa893;line-height:1.5}
.foot-cols{display:flex;gap:48px;flex-wrap:wrap}
.foot-cols h4{font-family:'Jost',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#c9a35c;margin-bottom:12px}
.foot-cols a{display:block;font-size:14px;color:#5a6b58;margin-bottom:6px;transition:color .2s}
.foot-cols a:hover{color:#0c2b22}
.foot-note{width:100%;text-align:center;font-size:13px;color:#8fa893;border-top:1px solid rgba(12,43,34,.08);padding-top:28px;margin-top:8px}
.modal-backdrop{position:fixed;inset:0;z-index:1000;background:rgba(7,32,26,.7);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:28px}
.modal-backdrop[hidden]{display:none}
.modal{display:flex;background:#f4efe0;max-width:780px;width:100%;max-height:90vh;overflow-y:auto;position:relative;box-shadow:0 40px 80px rgba(7,32,26,.3)}
.modal-x{position:absolute;top:14px;right:16px;z-index:2;width:36px;height:36px;display:grid;place-items:center;background:rgba(7,32,26,.06);border:none;font-size:22px;color:#5a6b58;transition:all .2s}
.modal-x:hover{background:#0c2b22;color:#f4efe0}
.modal-cover{flex:0 0 260px;aspect-ratio:3/4;overflow:hidden}
.modal-cover img,.modal-cover svg{width:100%;height:100%;display:block}
.modal-info{flex:1;padding:36px 32px;display:flex;flex-direction:column}
.qv-tag{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#a9713f;margin-bottom:8px}
.modal-info h3{font-size:26px;color:#07201a;margin-bottom:4px}
.qv-author{font-size:17px;color:#8fa893;font-style:italic;margin-bottom:14px}
.qv-meta{display:flex;gap:18px;flex-wrap:wrap;font-family:'Jost',sans-serif;font-size:11px;color:#6c7a66;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid rgba(12,43,34,.08)}
.qv-desc{font-size:16px;color:#5a6b58;line-height:1.6;margin-bottom:20px}
.qv-format{margin-bottom:20px;display:flex;gap:8px;flex-wrap:wrap}
.qv-format button{font-family:'Jost',sans-serif;font-size:12px;letter-spacing:.04em;padding:8px 18px;border:1px solid rgba(12,43,34,.12);background:transparent;color:#5a6b58;transition:all .2s}
.qv-format button.active{background:#0c2b22;color:#f4efe0;border-color:#0c2b22}
.qv-foot{display:flex;justify-content:space-between;align-items:center;margin-top:auto}
.qv-price{font-family:'Marcellus',serif;font-size:24px;color:#c9a35c}
.cart-drawer{position:fixed;top:0;right:0;z-index:1100;width:400px;max-width:100vw;height:100vh;background:#f4efe0;box-shadow:-8px 0 40px rgba(7,32,26,.15);display:flex;flex-direction:column;transform:translateX(0);transition:transform .35s}
.cart-drawer[hidden]{display:none}
.cart-head{display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid rgba(12,43,34,.08)}
.cart-head h3{font-size:20px}
.cart-head .icon-btn{border:none;font-size:24px;width:36px;height:36px}
.cart-body{flex:1;overflow-y:auto;padding:20px 24px}
.cart-item{display:flex;gap:14px;padding:16px 0;border-bottom:1px solid rgba(12,43,34,.06)}
.cart-item-cover{width:56px;height:76px;overflow:hidden;flex-shrink:0}
.cart-item-cover img,.cart-item-cover svg{width:100%;height:100%;display:block}
.cart-item-info{flex:1}
.cart-item-info h4{font-size:15px;color:#0c2b22;margin-bottom:2px}
.cart-item-info .fmt{font-size:11px;color:#8fa893;font-style:italic}
.cart-item-qty{display:flex;align-items:center;gap:6px;margin-top:6px}
.cart-item-qty button{width:24px;height:24px;display:grid;place-items:center;border:1px solid rgba(12,43,34,.12);background:none;font-size:14px;color:#5a6b58;transition:all .2s}
.cart-item-qty button:hover{border-color:#c9a35c}
.cart-item-qty span{font-family:'Jost',sans-serif;font-size:13px;width:20px;text-align:center}
.cart-item-price{font-size:15px;color:#c9a35c;text-align:right}
.cart-item-remove{background:none;border:none;color:#8fa893;font-size:14px;cursor:pointer;padding:2px;margin-top:4px;transition:color .2s}
.cart-item-remove:hover{color:#aa9333}
.cart-foot{padding:20px 24px;border-top:1px solid rgba(12,43,34,.08)}
.cart-total{display:flex;justify-content:space-between;margin-bottom:14px;font-size:19px}
.cart-total span{color:#6c7a66;font-size:15px}
.cart-hint{text-align:center;font-size:12px;color:#8fa893;margin-top:8px}
.checkout{flex-direction:column;max-width:680px}
.checkout-head{text-align:center;padding:36px 36px 20px}
.checkout-head h2{font-size:28px}
.checkout form{padding:0 36px 36px}
.co-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-bottom:24px}
.co-h4{font-family:'Jost',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#c9a35c;margin-bottom:14px}
.co-h4 em{color:#8fa893;font-style:italic;text-transform:none;letter-spacing:0}
.checkout label{display:block;font-family:'Jost',sans-serif;font-size:11px;color:#6c7a66;margin-bottom:10px}
.checkout input,.checkout textarea{width:100%;font-family:'Cormorant Garamond',serif;font-size:16px;padding:10px 14px;border:1px solid rgba(12,43,34,.12);background:#fff;color:#0c2b22;outline:none;resize:vertical}
.checkout input:focus,.checkout textarea:focus{border-color:#c9a35c}
.co-row{display:flex;gap:12px}
.co-row label{flex:1}
.co-note{font-size:12px;color:#8fa893;font-style:italic;margin-top:10px}
.co-error{color:#bb4444;font-size:13px;margin-top:8px;text-align:center}
.success-modal{display:flex;flex-direction:column;align-items:center;text-align:center;padding:48px 36px;max-width:440px}
.success-orn{font-size:48px;color:#c9a35c;margin-bottom:20px}
.success-modal h2{font-size:24px;margin-bottom:10px}
.success-modal p{color:#5a6b58;margin-bottom:20px}
.success-order{font-size:14px;color:#8fa893;margin-bottom:24px;line-height:1.5}
.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:1200;font-family:'Jost',sans-serif;font-size:13px;padding:10px 24px;background:#0c2b22;color:#f4efe0;opacity:0;transition:opacity .3s;pointer-events:none}
.toast.show{opacity:1}
.af-page a.btn-primary{color:#f4efe0}
.af-page a.btn-primary:hover{color:#07201a}
.af-page a.btn-ghost{color:#0c2b22}
.af-page a.btn-ghost:hover{color:#c9a35c}
@media(max-width:768px){.head-nav{display:none}.hero{padding:80px 22px 60px;min-height:auto}.hero-title{font-size:2.4rem}.hero-meta{flex-direction:column;gap:10px;align-items:center}.grid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:24px 16px}.modal{flex-direction:column;max-width:96vw}.modal-cover{flex:0 0 200px}.cart-drawer{width:100vw}.co-grid{grid-template-columns:1fr}.reading-stack{display:none}.letter-form{flex-direction:column}.contact-card{padding:28px 24px}}
@media(max-width:480px){.hero-kicker{font-size:18px}.hero-title{font-size:2rem}.hero-sub{font-size:17px}.section-head h2{font-size:1.7rem}.grid{grid-template-columns:repeat(2,1fr);gap:20px 12px}.card-title{font-size:15px}}
</style>
<div class="af-page">
<div class="af-grain"></div>

<header class="site-head">
  <div class="head-inner">
    <a href="#" class="brand">
      <span class="brand-seal">﷽</span>
      <span class="brand-text">
        <strong>Al Furqaan Publishers</strong>
        <em>Ltd &middot; Est. 1987</em>
      </span>
    </a>
    <nav class="head-nav">
      <a href="#catalogue">The Fihrist</a>
      <a href="#why">Our Way</a>
      <a href="#reading">Reading Room</a>
      <a href="#contact">Contact</a>
    </nav>
    <div class="head-actions">
      <button class="icon-btn" id="searchToggle" aria-label="Search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
      </button>
      <button class="icon-btn" id="cartToggle" aria-label="Cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6L5 3H2"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></svg>
        <span class="cart-count" id="cartCount" hidden>0</span>
      </button>
    </div>
  </div>
  <div class="searchbar" id="searchbar" hidden>
    <div class="searchbar-inner">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
      <input type="text" id="searchInput" placeholder="Search titles, authors, categories&hellip;" />
      <button class="search-clear" id="searchClear" aria-label="Clear search">&times;</button>
    </div>
  </div>
</header>

<main>
  <section class="hero">
    <div class="hero-orn">
      <svg class="hero-star" viewBox="0 0 200 200" fill="none" stroke="#c9a35c" stroke-width="0.4" opacity="0.5">
        <path d="M100 10 L123 77 L190 100 L123 123 L100 190 L77 123 L10 100 L77 77 Z"/>
        <path d="M100 30 L117 83 L170 100 L117 117 L100 170 L83 117 L30 100 L83 83 Z"/>
        <circle cx="100" cy="100" r="70"/>
        <circle cx="100" cy="100" r="88"/>
      </svg>
    </div>
    <p class="hero-kicker">
      <span class="bismark">﷽</span>
      In the name of Allah, the Most Merciful, the Most Compassionate
    </p>
    <h1 class="hero-title">
      <span class="line">True knowledge,</span>
      <span class="line gold">beautifully bound.</span>
    </h1>
    <p class="hero-sub">
      Authentic Islamic classics and contemporary scholarship from
      <strong>Al Furqaan Publishers Ltd</strong> &mdash; available as hand-finished print editions
      and instant ebooks for every reader&rsquo;s journey.
    </p>
    <div class="hero-cta">
      <a href="#catalogue" class="btn btn-primary">Browse the Fihrist &darr;</a>
      <a href="#why" class="btn btn-ghost">Why Al Furqaan?</a>
    </div>
    <div class="hero-meta">
      <span>&#10022; Print &amp; Ebook</span>
      <span>&#10022; Worldwide Delivery</span>
      <span>&#10022; Scholarly Editions</span>
    </div>
  </section>

  <div class="ticker">
    <div class="ticker-track">
      <span>﷽</span> Hilya of the Beloved &#65018; <span>&#10038;</span> Riy&#257;&#769; a&#777;-&#7778;&#257;li&#7717;&#299;n <span>&#10038;</span> Tafs&#299;r al-Qur&#702;an al-Kar&#299;m <span>&#10038;</span> New: The Garden of Reflections <span>&#10038;</span> Al-Furqaan Editions <span>&#10038;</span>
      <span>﷽</span> Hilya of the Beloved &#65018; <span>&#10038;</span> Riy&#257;&#769; a&#777;-&#7778;&#257;li&#7717;&#299;n <span>&#10038;</span> Tafs&#299;r al-Qur&#702;an al-Kar&#299;m <span>&#10038;</span> New: The Garden of Reflections <span>&#10038;</span> Al-Furqaan Editions <span>&#10038;</span>
    </div>
  </div>

  <section class="catalogue" id="catalogue">
    <div class="section-head">
      <p class="eyebrow">al-furqaan &middot; fihrist</p>
      <h2>The Catalogue of Titles</h2>
      <p class="section-note">Each work is available in two forms &mdash; a printed edition bound in the Emirates, and an ebook delivered to your screen within minutes.</p>
    </div>
    <div class="filterbar">
      <div class="filter-chips" id="filterChips"></div>
      <label class="format-toggle">
        <input type="checkbox" id="formatToggle" checked />
        <span class="toggle-track"><span class="toggle-knob"></span></span>
        <span class="toggle-label">Show both formats</span>
      </label>
    </div>
    <div class="grid" id="grid"></div>
    <p class="empty" id="empty" hidden>No titles match your search &mdash; try &ldquo;heart&rdquo; or &ldquo;seerah&rdquo;.</p>
  </section>

  <section class="why" id="why">
    <div class="section-head light">
      <p class="eyebrow">why al-furqaan</p>
      <h2>Our Way</h2>
    </div>
    <div class="why-grid">
      <div class="why-card">
        <span class="why-num">01</span>
        <h3>Scholarly, not narrow</h3>
        <p>Every title passes review by a board of qualified readers, so the text you hold is sound, clear and faithful to the sources.</p>
      </div>
      <div class="why-card">
        <span class="why-num">02</span>
        <h3>Craft in every copy</h3>
        <p>Printed books use archival paper, foil-blocked covers and hand-sewn bindings. Ebooks are typeset afresh for small and large screens alike.</p>
      </div>
      <div class="why-card">
        <span class="why-num">03</span>
        <h3>Knowledge that moves</h3>
        <p>Print ships worldwide in protective cartons; ebooks arrive as DRM-free files you may keep, read and gift.</p>
      </div>
      <div class="why-card">
        <span class="why-num">04</span>
        <h3>Every sale gives back</h3>
        <p>A share of each purchase funds free Qur&#702;&#257;n distributions and student libraries in needy communities.</p>
      </div>
    </div>
    <div class="why-foot">
      <span class="arabic">﷽</span>
      <p>&ldquo;The seeking of knowledge is an obligation upon every Muslim.&rdquo;</p>
      <cite>&mdash; the Prophet &#65018;; collected by Ibn M&#257;jah</cite>
    </div>
  </section>

  <section class="reading" id="reading">
    <div class="reading-inner">
      <div class="reading-text">
        <p class="eyebrow">the reading room</p>
        <h2>A place to begin</h2>
        <p class="reading-lead">Not sure where to start? These three works are where many journeys begin &mdash; each a door, clearly marked.</p>
        <ul class="reading-list">
          <li>New to the Qur&#702;&#257;n? Begin with The Clear Criterion &mdash; a warm, verse-by-verse companion.</li>
          <li>Building daily practice? Let Gardens of the Righteous walk you through forty hadith, carefully explained.</li>
          <li>Loving the Prophet &#65018;? Travel the Seerah of Mercy, written for the modern heart.</li>
        </ul>
        <a href="#catalogue" class="btn btn-primary">Find your first book &darr;</a>
      </div>
      <div class="reading-stack">
        <div class="stack-book"><span>The Clear Criterion</span><em>Qur&#702;&#257;n Companion</em></div>
        <div class="stack-book"><span>Gardens of the Righteous</span><em>Forty Hadith</em></div>
        <div class="stack-book"><span>Seerah of Mercy</span><em>Life of the Prophet &#65018;</em></div>
      </div>
    </div>
  </section>

  <section class="contact" id="contact">
    <div class="contact-card">
      <div>
        <p class="eyebrow">stay close</p>
        <h2>The reader&rsquo;s letter</h2>
        <p>A monthly letter &mdash; new editions, book club notes, free chapters. No noise.</p>
      </div>
      <div>
        <form class="letter-form" id="letterForm">
          <input type="email" placeholder="your@email.com" required />
          <button type="submit" class="btn btn-primary">Subscribe</button>
        </form>
        <p class="form-msg" id="letterMsg"></p>
      </div>
    </div>

    <footer class="site-foot">
      <div class="foot-brand">
        <span class="brand-seal">﷽</span>
        <div>
          <strong>Al Furqaan Publishers Ltd</strong>
          <p>Bayan Business Centre,<br/>Abu Dhabi, UAE</p>
        </div>
      </div>
      <div class="foot-cols">
        <div>
          <h4>Shop</h4>
          <a href="#catalogue">Fihrist</a>
          <a href="#catalogue">Ebooks</a>
          <a href="#catalogue">Print</a>
          <a href="#catalogue">Gift Cards</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="#why">Our Way</a>
          <a href="#reading">Reading Room</a>
          <a href="#contact">Manuscript Submissions</a>
          <a href="#contact">Wholesale</a>
        </div>
        <div>
          <h4>Care</h4>
          <a href="#contact">Shipping</a>
          <a href="#contact">Returns</a>
          <a href="#contact">Accessibility</a>
          <a href="mailto:salam@alfurqaan.pub">salam@alfurqaan.pub</a>
        </div>
      </div>
      <p class="foot-note">&copy; <span id="year"></span> Al Furqaan Publishers Ltd. All rights reserved &middot; Knowledge is light &#1758;</p>
    </footer>
  </section>
</main>

<div class="modal-backdrop" id="quickModal" hidden>
  <div class="modal">
    <button class="modal-x" id="quickClose" aria-label="Close">&times;</button>
    <div class="modal-cover" id="qvCover"></div>
    <div class="modal-info">
      <p class="qv-tag" id="qvTag"></p>
      <h3 id="qvTitle"></h3>
      <p class="qv-author" id="qvAuthor"></p>
      <div class="qv-meta" id="qvMeta"></div>
      <p class="qv-desc" id="qvDesc"></p>
      <div class="qv-format" id="qvFormat"></div>
      <div class="qv-foot">
        <span class="qv-price" id="qvPrice"></span>
        <button class="btn btn-primary" id="qvAdd">Add to Cart</button>
      </div>
    </div>
  </div>
</div>

<aside class="cart-drawer" id="cartDrawer" hidden>
  <div class="cart-head">
    <h3>Your Cart</h3>
    <button class="icon-btn" id="cartClose" aria-label="Close cart">&times;</button>
  </div>
  <div class="cart-body" id="cartBody"></div>
  <div class="cart-foot">
    <div class="cart-total"><span>Subtotal</span><strong id="cartTotal">&#8358;0.00</strong></div>
    <button class="btn btn-primary full" id="checkoutBtn">Checkout Securely</button>
    <p class="cart-hint">Payment is simulated in this preview.</p>
  </div>
</aside>

<div class="modal-backdrop" id="checkoutModal" hidden>
  <div class="modal checkout">
    <button class="modal-x" id="checkoutClose" aria-label="Close">&times;</button>
    <div class="checkout-head">
      <p class="eyebrow" style="justify-content:center">complete your order</p>
      <h2>Checkout</h2>
    </div>
    <form id="checkoutForm">
      <div class="co-grid">
        <div>
          <h4 class="co-h4">Delivery</h4>
          <label>Full name<input type="text" name="name" /></label>
          <label>Email<input type="email" name="email" placeholder="you@example.com" /></label>
          <label>Address<textarea name="address" rows="3"></textarea></label>
        </div>
        <div>
          <h4 class="co-h4">Payment <em>(demo)</em></h4>
          <label>Card number<input type="text" inputmode="numeric" placeholder="4242 4242 4242 4242" /></label>
          <div class="co-row">
            <label>Expiry<input type="text" placeholder="MM/YY" /></label>
            <label>CVC<input type="text" inputmode="numeric" placeholder="123" /></label>
          </div>
          <p class="co-note">No real charge is made. Use any plausible details.</p>
        </div>
      </div>
      <p class="co-error" id="coError" hidden></p>
      <button type="submit" class="btn btn-primary full">Place Order &middot; <span id="coSum">&#8358;0.00</span></button>
    </form>
  </div>
</div>

<div class="modal-backdrop" id="successModal" hidden>
  <div class="modal success-modal">
    <span class="success-orn">&#1758;</span>
    <p class="eyebrow" style="justify-content:center">order received</p>
    <h2>Wa-alaykum as-sal&#257;m, dear reader</h2>
    <p id="successText"></p>
    <div class="success-order" id="successOrder"></div>
    <button class="btn btn-primary" id="successClose">Continue Reading</button>
  </div>
</div>

<div class="toast" id="toast"></div>
</div>
`;
