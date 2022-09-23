import { useEffect, useState, useContext, useCallback } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { updateClient, updateClientLogoAndMap } from "../../api/mutations";
import Queries from "../../api/queries";
import { sendPublicFile } from "../../api/storage";
import { Alert, Title, Form, Input, Select, Button, Uploading } from "../../components";
import { AppContext } from "../../context";
import {
  getAddressFromCEP,
  validateFile,
  normalizePhone,
  normalizeDocument,
  normalizeCEP,
  createMap,
} from "../../helpers";
import { LANG, ROUTES } from "../../languages";
import { Client } from "../../models";
import { ALERT, DOCS, FILEERROR, FILETYPES, MAP } from "../../ts/enums";
import { useOutletContextProfileProps } from "../../ts/types";
import Owners from "./Owners";
import { BrazilStates } from "../../ts/enums";
import InputFile from "../../components/InputFile";

const initial = {
  id: "",
  name: "",
  phone: "",
  doctype: "",
  document: "",
  email: "",
  website: "",
  city: "",
  state: "",
  street: "",
  number: "",
  complement: "",
};

export default function Profile() {
  const navigate = useNavigate();
  const { loadClient, setLoading } =
    useOutletContext<useOutletContextProfileProps>();
  const { state } = useContext(AppContext);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [client, setClient] = useState<Client>();
  const [form, setForm] = useState(initial);
  const [zipCode, setZipCode] = useState("");
  const [logo, setLogo] = useState<File>();
  const [fileName, setFileName] = useState(LANG[state.lang].profile.logo);
  const [progress, setProgress] = useState<number>(0);

  const getAddress = useCallback(async () => {
    setErrorMsg("");
    setError(false);
    setLoading(true);
    try {
      const address = await getAddressFromCEP(zipCode.replace(/\D/g, ""));
      if (address) {
        setForm({
          ...form,
          state: address.state,
          city: address.city,
          street: address.street,
        });
      } else {
        setForm({
          ...form,
          state: "",
          city: "",
          street: "",
        });
      }
    } catch (err: any) {
      setErrorMsg(err.message);
      setError(true);
    }
    setLoading(false);
  }, [form, setLoading, zipCode]);

  useEffect(() => {
    if (zipCode.length === 10) getAddress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipCode]);

  function handleFile(e: React.FormEvent<HTMLInputElement>) {
    setErrorMsg("");
    setError(false);
    const file = validateFile((e.target as HTMLInputElement).files as FileList);
    if (!file) return;
    if (typeof file === "string" && file === FILEERROR.SIZE) {
      setErrorMsg(LANG[state.lang].subscriptions.imageSize);
      setError(true);
      return;
    }
    if (typeof file === "string" && file === FILEERROR.TYPE) {
      setErrorMsg(LANG[state.lang].subscriptions.imageType);
      setError(true);
      return;
    }
    setFileName(file.name);
    setLogo(file);
    setErrorMsg("");
    setError(false);
  }

  function validadeForm(f: Client) {
    if (!f.name || !f.phone || !f.doctype || !f.document || !f.zipCode || !f.city || !f.state || !f.street) {
      setErrorMsg(LANG[state.lang].profile.required);
      return false;
    }
    if (f.phone.length < 14) {
      setErrorMsg(LANG[state.lang].profile.invalidPhone);
      return false;
    }
    if (f.zipCode.length < 10) {
      setErrorMsg(LANG[state.lang].profile.invalidZipCode);
      return false;
    }
    if (
      (f.doctype === DOCS.CPF && f.document.length < 14) ||
      (f.doctype === DOCS.CNPJ && f.document.length < 18)
    ) {
      setErrorMsg(f.doctype === DOCS.CPF ? "CPF inválido!" : "CNPJ inválido");
      return false;
    }
    return true;
  }

  async function handleLogoAndMap(client: Client) {
    let mapURL = client.map;
    let logoURL = client.logo;
    if (
      form.name !== client.name ||
      form.street !== client.street ||
      form.number !== client.number ||
      form.city !== client.city ||
      form.state !== client.state ||
      zipCode.replace(/[^\d]/g, "") !== client.zipCode
    ) {
      const map = await createMap({
        type: MAP.CLIENT,
        id: client.id,
        name: form.name,
        street: form.street,
        number: form.number,
        city: form.city,
        state: form.state,
        zipCode: zipCode,
      });
      await sendPublicFile({
        type: FILETYPES.MAP,
        id: client.id,
        file: map,
        setProgress,
      });
      mapURL = `${process.env.REACT_APP_IMAGES_URL}map/${
        map.name
      }?${Date.now()}`;
    }
    if (logo) {
      await sendPublicFile({
        type: FILETYPES.LOGO,
        id: client.id,
        file: logo,
        setProgress,
      });
      logoURL = logo
        ? `${process.env.REACT_APP_IMAGES_URL}logo/${client.id}.${logo.name
            .split(".")
            .pop()}?${Date.now()}`
        : null;
    }
    await updateClientLogoAndMap(client.id, logoURL, mapURL);
  }

  async function handleSubmit(): Promise<boolean> {
    setErrorMsg("");
    setError(false);
    setLoading(true);
    if (!validadeForm({...form, zipCode})) {
      setError(true);
      setLoading(false);
      return false;
    }
    if (client) {
      await updateClient(client.id, {...form, zipCode});
      await handleLogoAndMap(client);
      loadClient(true);
      setLoading(false);
      navigate(ROUTES[state.lang].DASHBOARD);
      return true;
    }
    return false;
  }

  const getClient = useCallback(async (): Promise<void> => {
    setLoading(true);
    if (state.client?.user?.email) {
      const client = await Queries.ClientByEmail(state.client.user.email);
      if (client) {
        setClient(client);
        setForm({
          id: client.id,
          name: client.name || "",
          phone: normalizePhone(client.phone, true),
          doctype: client.doctype || "",
          document: normalizeDocument(
            client.doctype as DOCS,
            client.document || ""
          ),
          email: client.email || "",
          website: client.website || "",
          city: client.city || "",
          state: client.state || "",
          street: client.street || "",
          number: client.number || "",
          complement: client.complement || "",
        });
        setZipCode(normalizeCEP(client.zipCode || ""));
      }
    }
    setLoading(false);
  }, [setLoading, state.client.user.email]);

  useEffect(() => {
    getClient();
  }, [getClient]);

  return (
    <>
      {!!progress && <Uploading progress={progress} />}
      <Title
        text={LANG[state.lang].profile.title}
        back={ROUTES[state.lang].DASHBOARD}
        className="font-bold text-center"
      />
      {error && <Alert type={ALERT.ERROR} text={errorMsg} />}
      <Form>
        <div className="w-full md:w-4/12 sm:pr-4 mb-4">
          <Input
            type="text"
            placeholder={`${LANG[state.lang].profile.name} *`}
            value={form.name || ""}
            handler={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="w-full md:w-3/12 sm:pr-4 mb-4">
          <Input
            type="text"
            value={form.phone || ""}
            placeholder={`${LANG[state.lang].profile.phone} *`}
            handler={(e) =>
              setForm({ ...form, phone: normalizePhone(e.target.value) })
            }
          />
        </div>
        <div className="w-full md:w-2/12 sm:pr-4 mb-4">
          <Select
            placeholder={LANG[state.lang].profile.docType}
            value={form.doctype || ""}
            handler={(e) => setForm({ ...form, doctype: e.target.value })}
          >
            <>
              <option value="">{LANG[state.lang].profile.docType} *</option>
              {Object.values(DOCS).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </>
          </Select>
        </div>
        <div className="w-full md:w-3/12 mb-4">
          <Input
            type="text"
            value={form.document || ""}
            placeholder={form.doctype || LANG[state.lang].profile.selectDoc}
            handler={(e) =>
              setForm({
                ...form,
                document: normalizeDocument(
                  form.doctype as DOCS,
                  e.target.value
                ),
              })
            }
            disabled={!form.doctype}
          />
        </div>
        <div className="w-full md:w-6/12 sm:pr-4 mb-4">
          <Input
            type="text"
            value={form.email || ""}
            placeholder={LANG[state.lang].profile.email}
            disabled
          />
        </div>
        <div className="w-full md:w-6/12 mb-4">
          <Input
            type="text"
            value={form.website || ""}
            placeholder={LANG[state.lang].profile.website}
            handler={(e) => setForm({ ...form, website: e.target.value })}
          />
        </div>
        <div className="w-full md:w-4/12 sm:pr-4 mb-4">
          <Input
            type="text"
            value={zipCode || ""}
            placeholder={`${LANG[state.lang].profile.zipCode} *`}
            handler={(e) =>
              setZipCode(normalizeCEP(e.target.value))
            }
          />
        </div>
        <div className="w-full md:w-4/12 sm:pr-4 mb-4">
          <Input
            type="text"
            value={form.city || ""}
            placeholder={`${LANG[state.lang].profile.city} *`}
            handler={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>
        <div className="w-full md:w-4/12 mb-4">
          <Select
            placeholder={LANG[state.lang].profile.state}
            value={form.state || ""}
            handler={(e) => setForm({ ...form, state: e.target.value })}
          >
            <>
              <option value="">{LANG[state.lang].profile.state} *</option>
              {BrazilStates.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.name}
                </option>
              ))}
            </>
          </Select>
        </div>
        <div className="w-full md:w-6/12 sm:pr-4 mb-4">
          <Input
            type="text"
            value={form.street || ""}
            placeholder={LANG[state.lang].profile.street}
            handler={(e) => setForm({ ...form, street: e.target.value })}
          />
        </div>
        <div className="w-full md:w-3/12 sm:pr-4 mb-4">
          <Input
            type="text"
            value={form.number || ""}
            placeholder={LANG[state.lang].profile.number}
            handler={(e) => setForm({ ...form, number: e.target.value })}
          />
        </div>
        <div className="w-full md:w-3/12 mb-4">
          <Input
            type="text"
            value={form.complement || ""}
            placeholder={LANG[state.lang].profile.complement}
            handler={(e) => setForm({ ...form, complement: e.target.value })}
          />
        </div>
        <div className="w-full mb-4">
          <InputFile fileName={fileName} handler={(e) => handleFile(e)} />
        </div>
        <div className="w-full flex justify-center">
          <Button
            text={LANG[state.lang].profile.update}
            handler={() => handleSubmit()}
          />
        </div>
      </Form>
      {client && (
        <Owners
          clientID={client.id}
          setError={setError}
          setErrorMsg={setErrorMsg}
          setLoading={setLoading}
          loadClient={loadClient}
        />
      )}
    </>
  );
}
