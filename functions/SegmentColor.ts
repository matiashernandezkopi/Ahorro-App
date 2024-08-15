export const getSegmentColor = (index: number) => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff6600'];
    return colors[index % colors.length];
};