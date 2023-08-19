import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth, FirebaseDB } from "./config";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { RegisterUser } from "../storage/auth/interfaces/User.interface";

import {
  Collection,
  ElementoProperties,
  UserProperties,
} from "../operaciones/interfaces/Operaciones.interface";
import { Tarea } from "../storage/useStorage";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    const { email, displayName, uid, photoURL } = result.user;

    return {
      ok: true,
      email,
      displayName,
      uid,
      photoURL,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: "Usuario incorrecto",
    };
  }
};

export const logoutFirebase = async () => await FirebaseAuth.signOut();

export const loginFirebase = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(
    FirebaseAuth,
    email,
    password
  );
  const { uid } = user;
};

const getUser = async (
  userProperties: string,
  typeOfProperties: UserProperties
): Promise<any> => {
  const usuariosRef = collection(FirebaseDB, "Usuarios");
  const queryParams = query(
    usuariosRef,
    where(typeOfProperties, "==", userProperties)
  );
  const querySnapshot = await getDocs(queryParams);

  if (querySnapshot.docs.length === 0) {
    return null;
  }

  // Supongamos que solo quieres la primera tarea encontrada
  const resultOfQuery = querySnapshot.docs[0].data();

  return resultOfQuery;
};

const getElement = async (
  elementProperties: string,
  typeOfProperties: ElementoProperties
): Promise<any> => {
  const usuariosRef = collection(FirebaseDB, "Elementos");
  const queryParams = query(
    usuariosRef,
    where(typeOfProperties, "==", elementProperties)
  );
  const querySnapshot = await getDocs(queryParams);

  if (querySnapshot.docs.length === 0) {
    return null;
  }

  // Supongamos que solo quieres la primera tarea encontrada
  const resultOfQuery = querySnapshot.docs[0].data();

  return resultOfQuery;
};

const getReconectador = async (
  reconectadoresProps: any,
  typeOfProperties: ElementoProperties
): Promise<any> => {
  const usuariosRef = collection(FirebaseDB, "Reconectadores");
  const queryParams = query(
    usuariosRef,
    where(typeOfProperties, "==", reconectadoresProps)
  );
  const querySnapshot = await getDocs(queryParams);

  if (querySnapshot.docs.length === 0) {
    return null;
  }

  // Supongamos que solo quieres la primera tarea encontrada
  const resultOfQuery = querySnapshot.docs[0].data();

  return resultOfQuery;
};

export const loginWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = resp.user;

    const userOfCollection = await getUser(email, "mail");

    return {
      ok: true,
      id: userOfCollection!.id,
      userRol: userOfCollection!.rol,
      uid,
      photoURL,
      displayName,
      errorMessage: "",
      email,
    };
  } catch (error) {
    return { ok: false, errorMessage: "Email o contraseña incorrecta" };
  }
};

export const registerWhitEmailPassword = async (user: RegisterUser) => {
  const { email, password, displayName, id, userRol } = user;

  const { currentUser } = getAuth();

  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email!,
      password
    );
    console.log(resp);

    updateProfile(currentUser!, { displayName });

    const { uid, photoURL } = resp.user;

    return {
      ok: true,
      userRol,
      id,
      uid,
      photoURL,
      displayName,
      email,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: "Error",
    };
  }
};

export const addItemAtColumn = async (item: any, collection: Collection) => {
  const { id, ejecutor } = item;

  const document = doc(FirebaseDB, collection, id);

  await setDoc(document, item);

  if (collection === "Tareas") {
    return await addTaskToUser(ejecutor, id);
  }
};

const addTaskToUser = async (idUser: string, id: string) => {
  const userProps = await getUser(idUser, "id");

  const { tareas = [] } = userProps;

  await updateDoc(doc(FirebaseDB, "Usuarios", idUser), {
    tareas: [...tareas, id],
  });
};

export const getTaskById = async (taskId: string, rawData: boolean) => {
  const queryParams = query(
    collection(FirebaseDB, "Tareas"),
    where("id", "==", taskId)
  );
  const taskSnapshot = await getDocs(queryParams);

  if (taskSnapshot.empty) {
    return null; // Retorna null si no se encuentra la tarea
  }

  const task = taskSnapshot.docs[0].data();

  if (!rawData) {
    return task;
  }

  const [creador, ejecutor, elemento] = await Promise.all([
    getUser(task.creador, "id"),
    getUser(task.ejecutor, "id"),
    getElement(task.elemento, "id"),
  ]);

  const rawDataResponse = {
    ...task,
    creador,
    ejecutor,
    elemento,
    key: `${task.id}`, // Asegúrate de definir "index" antes de usarlo
  };

  return rawDataResponse;
};

export const getAllTaskOfUser = async (
  id: string,
  rawData: boolean
): Promise<Tarea[]> => {
  const queryParams = query(
    collection(FirebaseDB, "Tareas"),
    where("ejecutor", "==", id)
  );
  const querySnapshot = await getDocs(queryParams);

  const listOfTasks: any[] = [];

  querySnapshot.forEach((doc) => {
    listOfTasks.push(doc.data());
  });

  if (!rawData) return listOfTasks;

  const rawDataResponse = await Promise.all(
    listOfTasks.map(async (task, index) => {
      task.ejecutor = await getUser(task.ejecutor, "id");
      task.creador = await getUser(task.creador, "id");
      task.elemento = await getElement(task.elemento, "id");
      task.key = `${task.id}_${index}`; // Generar clave única usando ID y el índice
      return task;
    })
  );

  return rawDataResponse;
};

export const getUsersWithEmailFilter = async (email: string) => {
  const listOfUsers = await getDocs(collection(FirebaseDB, "Usuarios"));

  const userWhiteList: any[] = [];

  listOfUsers.forEach((userChildren) => {
    userWhiteList.push(userChildren.data());
  });

  const checkValidUser = userWhiteList.filter((User) => User.mail === email);

  if (checkValidUser.length !== 0) {
    return checkValidUser;
  } else {
    return false;
  }
};

export const getCollection = async (collectionName: Collection) => {
  const querySnapshot = await getDocs(collection(FirebaseDB, collectionName));

  const collectionData: any[] = [];

  querySnapshot.forEach((documentSnapshot) => {
    const data = documentSnapshot.data();
    const elementMapped = { ...data };
    collectionData.push(elementMapped);
  });

  return collectionData;
};

export const updateTask = async (taskId: string, updatedValues: any) => {
  const taskToUpdate = doc(FirebaseDB, "Tareas", taskId);
  try {
    await updateDoc(taskToUpdate, updatedValues);
  }
  catch (e){
    alert("Task Failed")
  }
  
};
