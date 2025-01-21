const Progress = ({ progress }: { progress: number }) => {
  return (
    <section className="progress-container">
      <div className="background">
        <div className="inner" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="percentage">{progress}%</div>
    </section>
  );
};

export default Progress;
