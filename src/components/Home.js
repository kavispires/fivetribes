import React from 'react';

const Home = ({props}) => {
  return (
    <main className="screen-main screen-mode">
      <section className="content mode-scorer">
        <h1>Scorer</h1>
        <div className="content-box">
          <img src="/images/mode-scorer.svg" alt="Scorer Mode" />
          <nav className="content-nav">
            {
              props.app.scorerSession
                ? <input className="btn btn-3 btn-secondary" type="button" name="continue-scorer" value="Continue" onClick={props.selectMode} />
                : null
            }
            <input className="btn btn-3 btn-primary" type="button" name="new-scorer" value="New" onClick={props.selectMode} />
          </nav>
        </div>
      </section>
      <section className="content mode-solitaire">
        <h1>Solitaire</h1>
        <div className="content-box">
          <img src="/images/mode-solitaire.svg" alt="Solitaire Mode" />
          <nav className="content-nav">
            {
              props.app.solitaireSession
                ? <input className="btn btn-3 btn-secondary" type="button" name="continue-solitaire" value="Continue" onClick={props.selectMode} />
                : null
            }
            <input className="btn btn-3 btn-primary" type="button" name="new-solitaire" value="New" onClick={props.selectMode} />
          </nav>
        </div>
      </section>
    </main>
  );
};

export default Home;
