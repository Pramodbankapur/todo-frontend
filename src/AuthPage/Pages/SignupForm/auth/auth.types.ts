export type SignupFormData = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptedTerms: boolean;
}

export type Errors = Partial<Record<keyof SignupFormData,string>>;

export type Touched = Partial<Record<keyof SignupFormData , boolean>>;

export type SinginData = Pick<SignupFormData, 'username'|'password' >;

export type TouchedSignin = Partial<Record<keyof SinginData , boolean>>;

export type ErrorsSingin = Partial<Record<keyof SinginData,string>>;