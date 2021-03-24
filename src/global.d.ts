// Global password Type
declare type PW = string
declare type PWLength = 'short' | 'medium' | 'long'
declare type pwGenMethod = "Haddock" | "NIST.SP.800-53" | 'Passphrase' | 'Linenoise';

// Types for password generators
declare type Segment = { type: 'noise' | 'word', data: string }
declare type Password = Segment[]

// Global Utility Type
declare type Modify<T, R> = Omit<T, keyof R> & R;