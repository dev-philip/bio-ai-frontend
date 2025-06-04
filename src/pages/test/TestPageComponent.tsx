import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './TestPageComponent.module.css';
// State Management
import useCounterStore from '@/store/counterStore';
import { useCartStore } from '@/store/cartStore';

const TestPageComponent: React.FC = () => {

 const { count, increment, decrement, reset } = useCounterStore();
 const { items, addItem, removeItem, clearCart } = useCartStore();
 const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);

 const LinearLoader = () => {
  return (
    <div className={styles["linear-loader-wrapper"]}>
      <div className={styles["linear-loader-bar"]}></div>
    </div>
  );
};

const SpinningLoader = () => {
  return (
    <div className={styles["spinner-wrapper"]}>
      <div className={styles["spinner"]}>&#10024;</div> {/* Unicode sparkle emoji ✨ */}
    </div>
  );
};

  useEffect(() => {
    // simulate data fetching
    setTimeout(() => {
      setData({
        title: 'My Post Title',
        content: 'This is the actual content that was loaded.',
      });
    }, 3000);

    // simulate loading
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h1>Count: {count}</h1>
        <button onClick={increment}>➕</button>
        <button onClick={decrement}>➖</button>
        <button onClick={reset}>🔄 Reset</button>
        </div>

        <div style={{ padding: '1rem' }}>
            <h2>{data ? data.title : <Skeleton width={200} />}</h2>
            <p>{data ? data.content : <Skeleton count={4} />}</p>
        </div>

       <div>
            {loading ? (
                // LinearLoader()
                SpinningLoader()
            ) : (
                <div style={{ padding: '2rem' }}>✨ Loaded content goes here.</div>
            )}
        </div>

        <h1 className={styles.greeting}>
            <span className={styles.hello}>Hello,</span>{' '}
            <span className={styles.name}>Philip</span>
        </h1>




            {/* Cart state Management example */}
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800">🛒 Your Cart</h2>

                    <div className="flex gap-4 justify-center">
                        <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => addItem({ id: '1', name: 'Apple', quantity: 1 })}
                        >
                        Add Apple
                        </button>
                        <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        onClick={() => addItem({ id: '2', name: 'Banana', quantity: 1 })}
                        >
                        Add Banana
                        </button>
                    </div>

                    <ul className="divide-y divide-gray-200">
                        {items.length === 0 ? (
                        <li className="text-gray-500 text-center">Your cart is empty.</li>
                        ) : (
                        items.map((item) => (
                            <li key={item.id} className="py-3 flex justify-between items-center">
                            <span className="font-medium text-gray-800">
                                {item.name} × {item.quantity}
                            </span>
                            <button
                                className="text-red-500 hover:text-red-700 text-sm"
                                onClick={() => removeItem(item.id)}
                            >
                                Remove
                            </button>
                            </li>
                        ))
                        )}
                    </ul>

                    <button
                        onClick={clearCart}
                        className="w-full mt-4 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                        Clear Cart
                    </button>
                </div>
    </>




  );
};

export default TestPageComponent;
