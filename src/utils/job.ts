import { CronJob } from 'cron';

const job = (job: string | Date, call: () => void) => {
    let jobInstance = new CronJob(
        job || '0 */1 * * * *', // 每1分钟执行一次
        function () {
            console.log('job run');
            call instanceof Function && call();
            // 这里放刷新数据的代码
        },
        null, // 完成时的回调
        true, // 是否立即启动
        'Asia/Shanghai', // 时区
    );
    return jobInstance
}
export default job