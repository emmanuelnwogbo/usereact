import { useEffect, useState } from 'react';
import { HelloWorld } from '../contracts/helloworld';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract } from '@ton/core';

export function useHelloWorldContract() {
    const client = useTonClient();
    const [val, setVal] = useState<null | number>();
    const { sender } = useTonConnect();

    const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

    const helloworldContract = useAsyncInitialize(async () => {
        if (!client) return;

        const contract = new HelloWorld(
            Address.parse('EQCHJ0-syMTdKxK1YwbDYe8pfM_X7qUw8dbnNE0yquqenH9z')
        );
        return client.open(contract) as OpenedContract<HelloWorld>;
    }, [client]);

    useEffect(() => {
        async function getValue() {
            if (!helloworldContract) return;
            setVal(null);
            const val = await helloworldContract.getCounter();
            setVal(parseInt(val.toString()));
            await sleep(5000);
            getValue();
        }
        
        getValue();
    }, [helloworldContract]);

    return {
        value: val,
        address: helloworldContract?.address.toString(),
        sendIncrement: () => {
            return helloworldContract?.sendIncrement(sender);
        },
    };
}