import Queue from 'bull';

const redis = process.env.REDIS_URL!;

const queue = new Queue('queue-debug-manast', redis)




async function run() {
    queue.process(async (job) => {
        console.log('processed ' + job.data.count)
    })
    let count = 0;
    setInterval(() => {
        queue.add({ count }, {
            removeOnComplete: 50,
            removeOnFail: 50,
            delay: 2000,
        })
        count += 1
    }, 1000)
}

run()