// Earning chart init (lazy dynamic import) if #earning-chart exists
export default defineNuxtPlugin(async () => {
    if (typeof window === 'undefined') return;
    const el = document.querySelector('#earning-chart');
    if (!el) return;
    const { default: ApexCharts } = (await import('apexcharts').catch(() => ({
        default: null
    }))) as { default: typeof import('apexcharts') };
    // If library missing, skip silently (phase 1 setup)
    if (!ApexCharts) return;
    const options: any = {
        colors: ['#F62F1A', '#F6471C'],
        tooltip: {
            theme: 'dark',
            y: {
                formatter: (val: number) => `$${val}`,
                title: { show: false }
            },
            x: { show: false }
        },
        series: [
            { name: 'Earnings', data: [0, 0, 150, 0, 0, 0, 0, 50, 0, 0, 0, 0] }
        ],
        chart: {
            height: 150,
            type: 'line',
            zoom: { enabled: false },
            toolbar: { show: false },
            sparkline: { enabled: true }
        },
        grid: { show: false },
        xaxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            labels: { show: false }
        },
        yaxis: { labels: { show: false } },
        markers: { colors: ['#F76D1F'] },
        stroke: { curve: 'smooth' }
    };
    try {
        const chart = new ApexCharts(el, options);
        chart.render();
    } catch {
        /* silent */
    }
});
