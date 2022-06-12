import Docker from "dockerode";

export function getDocker(host: string, port: string): Docker {

    //TODO add memoization of instances
    return new Docker({ host: host, port: port })
}

export function getContainer(host: string, port: string, containerId: string) {
    const docker = getDocker(host, port);
    return docker.getContainer(containerId);
}

export async function createContainer(host: string, port: string, image: string) {
    const docker = getDocker(host, port);
    return docker.createContainer({ Image: image });
}

export async function listContainers(host: string, port: string, filter?: object) {
    const docker = getDocker(host, port)
    let containers;
    if (filter == undefined){
        containers = docker.listContainers({ all: true });
    } else {
        containers = docker.listContainers(filter);
    }
    return containers;
}

export async function startContainer(host: string, port: string, containerId: string) {
    const container = getContainer(host, port, containerId);
    const containerInspect = await container.inspect();
    if (containerInspect.State.Paused)
    {
        return container.unpause();
    }
    return container.start();
}

export async function stopContainer(host: string, port: string, containerId: string) {
    const container = getContainer(host, port, containerId);
    return container.stop();
}

export async function pauseContainer(host: string, port: string, containerId: string) {
    const container = getContainer(host, port, containerId);
    return container.pause();
}

export async function killContainer(host: string, port: string, containerId: string) {
    const container = getContainer(host, port, containerId);
    return container.kill();
}

export async function listImages(host: string, port: string) {
    const docker = getDocker(host, port)
    return docker.listImages({ all: true });
}

export async function searchImages(host: string, port: string, term: string) {
    const docker = getDocker(host, port)
    return docker.searchImages({term: term});
}

export async function createImage(host: string, port: string, image: string) {
    const docker = getDocker(host, port)
    return docker.pull(image);
}
