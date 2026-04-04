type SummaryPanelProps = {
    totalAmount: number;
    filteredTotalAmount: number;
    visibleCount: number;
};

const SummaryPanel = (props: SummaryPanelProps) => {
    const { totalAmount, filteredTotalAmount, visibleCount } = props;
    return (
        <section>
            <h2>集計</h2>
            <p>全体合計: {totalAmount.toLocaleString("ja-JP")}円</p>
            <p>表示中合計: {filteredTotalAmount.toLocaleString("ja-JP")}円</p>
            <p>件数: {visibleCount}件</p>
        </section>
    );
};

export default SummaryPanel;
