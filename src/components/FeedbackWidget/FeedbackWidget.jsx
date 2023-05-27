import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { WidgetContainer } from './FeedbackWidget.styled';
import { useState } from 'react';

export const FeedbackWidget = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbackTotalCount = () => {
    return good + neutral + bad;
  };

  const positiveFeedbackPercentCount = () => {
    const total = feedbackTotalCount();
    return total ? Math.round((good * 100) / total) : 0;
  };

  const feedbackButtonClickHandler = event => {
    const feedbackType = event.target.name;
    switch (feedbackType) {
      case 'good':
        setGood(state => state + 1);
        break;
      case 'neutral':
        setNeutral(state => state + 1);
        break;
      case 'bad':
        setBad(state => state + 1);
        break;
      default:
        return;
    }
  };

  const total = feedbackTotalCount();
  const positivePercentage = positiveFeedbackPercentCount();
  const options = {
    good: 'Good',
    neutral: 'Neutral',
    bad: 'Bad',
  };

  return (
    <WidgetContainer>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={feedbackButtonClickHandler}
        />
      </Section>
      <Section title="Statistics">
        {total ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </WidgetContainer>
  );
};
