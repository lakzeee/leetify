import Container from "../UI/container";
import Jumbotron from "@/UI/homepage/Jumbotron";
import Card from "@/UI/homepage/Card";
import AreaChart from "@/UI/charts/AreaChart";
import PieChart from "@/UI/charts/PieChart";
import {
  diffData,
  freqData,
  generateRandomDateArrayAndRandomIntegers,
  mockTopicCountData,
  progressData,
} from "@/Components/utils/helpers";
import TreeMap from "@/UI/charts/TreeMap";
import ProgressChart from "@/UI/charts/ProgressChart";
import RadarChart from "@/UI/charts/RadarChart";
import TextCard from "@/UI/homepage/TextCard";

const { dateArray, randomIntegers } =
  generateRandomDateArrayAndRandomIntegers();
export default function Home() {
  return (
    <Container scrollThreshold={200}>
      <Jumbotron />
      <div className="flex flex-col gap-24">
        <Card
          title={"Track Your Daily Progress"}
          subTitle={
            '"Visualize Trends in Your Daily Coding Activities, Monitor Your Growth, and Stay Committed to Continuous Improvement.'
          }
        >
          <AreaChart
            dayCountsData={{ dates: dateArray, counts: randomIntegers }}
          />
        </Card>
        <Card
          reverse
          title={"Measure Your Achievements"}
          subTitle={
            "Celebrate Your Success with Hard Questions and Gain Confidence in Your Problem-Solving Skills by Monitoring Your Milestones."
          }
        >
          <PieChart data={[29, 48, 25]} />
        </Card>
        <Card
          stack
          title={"Discover Your Strengths and Weaknesses"}
          subTitle={
            "Uncover What Needs Improvement with In-Depth Insights into Your Coding Performance, So You Can Focus on Areas Requiring More Attention."
          }
        >
          <TreeMap data={mockTopicCountData} />
        </Card>
        <Card
          title={"Stay Motivated and Reach Your Goals"}
          subTitle={
            "Track Your Progress, Achieve Your Objectives, and Keep Your Coding Interview Prep on Track with Motivating Progress Visuals."
          }
        >
          <ProgressChart statusCount={progressData} />
        </Card>
        <Card
          reverse
          title={"Gain Insight into Your Progress"}
          subTitle={
            "Visualize Your Learning Journey, Understand Your Coding Habits, and Make Informed Decisions to Optimize Your Study Plan."
          }
        >
          <RadarChart difficultyCount={diffData} frequencyCount={freqData} />
        </Card>

        <TextCard
          icon="fire"
          iconText="Start Now"
          title="Elevate Your Coding Interview Skills with Leetify"
          subTitle="Leetify is your all-in-one LeetCode planning platform. Excel in your coding challenges and bid farewell to progress tracking hassles."
          buttonText="Get Started"
        />
      </div>
    </Container>
  );
}
