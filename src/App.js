import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

import wordsToNumbers from "words-to-numbers";

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./Styles.js";

const alanKey =
  "df3367c830405855fab3d8663f03c25d2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText("Please try that again.");
          } else {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening.");
          }
        }
      },
    });
  }, []);

  const number = () => Math.random();

  return (
    <div className={classes.body}>
      <div className={classes.logoContainer}>
        <img
          src="data:image/jpeg;base64,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"
          className={classes.alanLogo}
          alt="alan logo"
        />
        <h2>Voice Assistant News App</h2>
      </div>

      <NewsCards
        key={number.toString()}
        articles={newsArticles}
        activeArticle={activeArticle}
      />
    </div>
  );
};

export default App;
